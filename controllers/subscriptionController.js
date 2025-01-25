//************** Import libraries ************ *
const { DataTypes, Sequelize, Op } = require("sequelize");
const { subscriptionValidation } = require("../validations/subscriptionValidation")
const Joi = require("joi");
const { Plan } = require("../models")
const sequelize = require("../config/db")


// controller class
class SubscriptionObject {
  // subscribe to a plann
  subscriptionPlan = async (req, res) => {
    const { businessName, email, phone, subscribedPlan, subscriptionCode } = req.body;
    try {
      //  validate the plan body
      const { error } = subscriptionValidation.validate(req.body);
      if (error) {
        return res.status(404).json(error.details[0].message);
      }

      //  check if the user is  already subscribed
      const subscribedUser = await Plan.findOne({
        where: {
          [Op.or]: [{ email }, { phone }, { businessName }],
        }
      });
      if (subscribedUser) {
        return res.status(200).json({ msg: `The Business name, email or phone number is already subscribed to ${subscribedUser.subscribedPlan} plan.` });
      }

      const subscribe = await Plan.create({
        businessName,
        email,
        phone,
        subscribedPlan,
        subscriptionCode
      });
    } catch (error) {
      throw error
    }
  }

  //subscriber's list
  planList = async (req, res) => {
    const subscribedUsers = await Plan.findAll()
    try {
      if (subscribedUsers) {
        return res.status(200).json(subscribedUsers)
      }

    } catch (error) {
      throw error
    }

  }


}


//********** instance of the UserObject ********** */
const subscriptionObject = new SubscriptionObject();

//************Export the instant */
module.exports = subscriptionObject;














//************** Import libraries ************ *
// const Subscription = require("../models/Subscription");
// const { Sequelize, Op} = require("sequelize");
// const{subscriptionValidation} = require("../validations/subscriptionValidation")

// // controller class
// class SubscriptionObject {

//   // subscribe to a plann
//   subscriptionPlan = async (req, res) => {
//     const { businessName, email, phone, subscribedPlan, subscriptionCode} = req.body;
//     try {
//       // validate the plan body
//       const { error } = subscriptionValidation.validate(req.body);
//     if (error) {
//       return res.status(404).json(error.details[0].message);
//     }
//     // check if the user is  already subscribed
//     const subscribedUser = await Subscription.findOne({ 
//       where: { 
//         [Op.or]: [{ email }, { phone }, {businessName}],
//       } 
//     });
//     if (subscribedUser) {
//       return res.status(200).json({msg:`The Business name, email or phone number is already subscribed to ${subscribedUser.subscribedPlan} plan.`});
//     }
//     const subscribe = await Subscription.create({
//       businessName,
//       email,
//       phone,
//       subscribedPlan,
//       subscriptionCode
//   });

//   if(subscribe){
//     return res.status(201).json({msg: `Subscription to ${subscribe.subscribedPlan} plan successful` })
//   }      
//     } catch (error) {
//       throw error
//     }
//   };

//   //query subscribed list
//   planList = async (req,res)=>{
//     const subscribedUsers = await Subscription.findAll()
//     try {
//       if(subscribedUsers){
//         return res.status(200).json(subscribedUsers)
//       }
      
//     } catch (error) {
//       throw error
//     }

//   }

  
// }

// //********** instance of the UserObject ********** */
// const subscriptionObject = new SubscriptionObject();

// //************Export the instant */
// module.exports = subscriptionObject;

