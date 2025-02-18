const { Code, Payment } = require("../models")
const nodemailer = require("nodemailer")
const { Op, where } = require('sequelize');
const paymentValidation = require("../validations/subscriptionValidation")
// const Stripe = require("stripe")
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const crypto = require("crypto")

//node mailer setup
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});



async function sendCode(req, res) {
  const { name, email, amount, subs, phone } = req.body
  try {
    const code = crypto.randomBytes(16).toString('hex')

    // validation
    const { error } = paymentValidation.subscriptionValidation.validate(req.body);
    if (error) {
      return res.status(404).json(error.details[0].message);
    }

    // check for already subscribed business name or email
    const alreadySub = await Code.findOne({
      where: {
        [Op.or]: [{ email }, { businessName: name}, {phone}],
      },
    })
    if (alreadySub){
      return res.status(200).json({msg: "Business name, phone number or email already subscribed"})
    }
    // Save code to the database with expiration date
    await Code.create({
      email,
      businessName: name,
      code,
      phone,
      subType: subs,
      paymentDate: null,
      generatedBy: 'manual',
      expiresAt: null
    });

    await Payment.create({
      email,
      amount,
      paymentProvider: null,
      transactionId: null
    })
    
    //Send code via email
    await transporter.sendMail({
      from: `"Service App" <${process.env.EMAIL_USER}>`,
      to: process.env.SKILLTOP_EMAIL,
      subject: 'Signup Code Request',
      text: `Dear Admin,\n\nA client  ${name} 
      name:${name} with email:${email}  has requested to subscribe.\n\nKindly attend to ${name} as soon as payment is made!`,
    });
    console.log(`Code sent to ${email}: ${code}`);
    res.status(200).json({ msg: 'Subcribe successfully' });
  } catch (error) {
    console.error('Error sending code:', error);
    res.status(500).json({ 'msg': error.message })
  }
}


async function allCodes(req, res) {
  try {
    const codes = await Code.findAll({
      include: {
        model: Payment,
        as: 'Payment',
        required: false,
      },
    });
    res.status(200).json({ codes });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching codes', error: error.message });
  }
}

async function getCodeById(req, res) {
  const { id } = req.params;
  try {
    const code = await Code.findOne({ where: { payId: id } });
    const pay = await Payment.findOne({ where: { email: code.email } });
    if (!code) return res.status(404).json({ msg: 'Code not found' });
    res.status(200).json({ code, pay });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching code', error: error.message });
  }
}


async function updateCode(req, res) {
  const { id } = req.params;
  const { name, email, subs, payDate, phone, sendEmail, amount, paymentProvider, transactionId, paymentStatus, } = req.body;

  try {
    // Find the code entry by payId
    const code = await Code.findOne({ where: { payId: id } });
    const payment = await Payment.findOne({ where: { email: code.email } })
    if (!code) return res.status(404).json({ msg: 'Code not found' });

    let expiresAt = code.expiresAt; // Default to current expiration

    // Calculate new expiration date if subs and payDate are provided
    if (subs && payDate) {
      const startDate = new Date(payDate); // Use payDate as the start date
      switch (subs) {
        case '1 month':
          expiresAt = new Date(startDate.setMonth(startDate.getMonth() + 1));
          break;
        case '6 months':
          expiresAt = new Date(startDate.setMonth(startDate.getMonth() + 6));
          break;
        case '1 year':
          expiresAt = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
          break;
        default:
          return res.status(400).json({ msg: 'Invalid subscription duration' });
      }
    }

    // Update the code entry
    await code.update({
      name: name || code.name,
      email: email || code.email,
      expiresAt,
      paymentDate: payDate || code.paymentDate,
      phone: phone || code.phone,
      isUsed: true, // Mark as used
    });
    await payment.update({
      email: email || payment.email,
      paymentStatus: paymentStatus || payment.paymentStatus,
      amount: amount || payment.amount,
      paymentProvider: paymentProvider || payment.paymentProvider,
      transactionId: transactionId || payment.transactionId,
      paidDate: payDate || payment.paidDate
    })
    // Check if sendEmail is true and send the email if required
    if (sendEmail) {
      await transporter.sendMail({
        from: `"Service App" <${process.env.EMAIL_USER}>`,
        to: email || code.email, // Use the updated or existing email
        subject: 'Subscription Updated',
        text: `Dear ${name || code.name},\n\nYour subscription has been successfully updated.\n\nThank you for staying with us!`,
      });
      console.log(`Email sent to ${email || code.email}`);
    }

    // Respond with success message and updated code data
    res.status(200).json({ msg: 'Code updated successfully', code, payment });
  } catch (error) {
    console.error('Error updating code:', error);
    res.status(500).json({ msg: 'Error updating code', error: error.message });
  }
}


async function deleteCode(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Code.destroy({ where: { codeId: id } });
    if (!deleted) return res.status(404).json({ msg: 'Code not found' });

    res.status(200).json({ msg: 'Code deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting code', error: error.message });
  }
}




async function validateSignupCode(req, res, next) {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ msg: 'Email and code are required.' });
  }

  try {
    // Find the code entry in the database
    const entry = await Code.findOne({
      where: {
        email,
        code,
        isUsed: false
      },
    });

    // Handle case where the code is invalid or expired
    if (!entry) {
      return res.status(400).json({ msg: 'Invalid or expired code.' });
    }
    // Mark the code as used
    entry.isUsed = true;
    await entry.save();
    req.validatedCode = entry
    console.log("entry", entry)
    return next()
    //res.status(200).json({ msg: 'Code validated successfully.' })
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
}



module.exports = {
  sendCode,
  validateSignupCode,
  allCodes,
  getCodeById,
  updateCode,
  deleteCode
}


