const { User, Finance } = require("../models");
const cloudinary = require("../config/cloudinary");
const multer = require("../middlewares/multer");
// CREATE: Add a new finance record
const createFinanceRecord = async (req, res) => {
  try {
    const { type,
      expenseCategory,
      expensesDescription,
      amount,
      dateOfExpenses,
      dendorPayee,
      paymentMethod,
      capexCategory,
      note,
      assetDescription,
      expectedLifeSpan,
      depreciationRate
    } = req.body;
    let url;
   if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path,{
        folder:"receipt",
        width:300,
        crop:"scale"
    })
     url = result.url
   }
    const newRecord = await Finance.create(
   {  type,
      expenseCategory,
      expensesDescription,
      amount,
      dateOfExpenses,
      dendorPayee,
      paymentMethod,
      fileUrl:url,
      capexCategory,
      note,
      assetDescription,
      expectedLifeSpan,
      depreciationRate
    })
    return res.json({
      status:200,
      success: true,
      data: newRecord,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating finance record", details: error.message });
  }
};

// READ: Get all finance records
const getFinanceRecords = async (req, res) => {
  try {
    const {opex,capex} = req.query
    const where = {}
    if(opex){
      where.type = 'OPEX'
    }
    if(capex){
      where.type = 'CAPEX'
    }
    const records = await Finance.findAll();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Error fetching finance records", details: error.message });
  }
};

// READ: Get a single finance record by ID
const getFinanceRecordById = async (req, res) => {
  try {
    const { financeId } = req.params;
    const record = await Finance.findByPk(financeId);
    if (!record) {
      return res.status(404).json({ error: "Finance record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Error fetching finance record", details: error.message });
  }
};

// UPDATE: Update a finance record
const updateFinanceRecord = async (req, res) => {
  try {
    const { financeId } = req.params;
    const updatedData = req.body;
    const [updatedRows] = await Finance.update(updatedData, { where: { financeId } });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Finance record not found or no changes made" });
    }
    const updatedRecord = await Finance.findByPk(financeId);
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: "Error updating finance record", details: error.message });
  }
};

// DELETE: Remove a finance record
const deleteFinanceRecord = async (req, res) => {
  try {
    const { financeId } = req.params;
    const deletedRows = await Finance.destroy({ where: { financeId } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Finance record not found" });
    }
    res.status(200).json({ message: "Finance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting finance record", details: error.message });
  }
};

module.exports = {
  createFinanceRecord,
  getFinanceRecords,
  getFinanceRecordById,
  updateFinanceRecord,
  deleteFinanceRecord,
};

