const { User, Report } = require("../models");
const cloudinary = require("../config/cloudinary");
const { where } = require("sequelize");

// CREATE: Add a new report
const createReport = async (req, res) => {
  const {userId} = req.user
  const user = await User.findByPk(userId)
  if(!user) return res.status(404).json({msg:"user not found"})

  try {
    const {
      reportTitle,
      reportType,
      dateRangeFrom,
      dateRangeTo,
      report,
    } = req.body;

    // Upload receipt if it exists
    let fileUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "receipt",
        width: 300,
        crop: "scale",
      });
      fileUrl = result.secure_url;
    }

    // Create report
    const newReport = await Report.create({
      reportTitle,
      reportType,
      dateRangeFrom,
      dateRangeTo,
      report,
      fileUrl,
      userId
    });

    return res.status(201).json({
      success: true,
      data: newReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating report",
      error: error.message,
    });
  }
};


const getReports = async (req, res) => {
    const {userId} = req.user
    const user = await User.findByPk(userId)
  if(!user) return res.status(404).json({msg:"user not found"})
  try {
    const reports = await Report.findAll({ where: {userId},
      include: [
        {
          model: User,
          attributes: ["userId", "email"],
        },
      ],
    });
    
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reports", details: error.message });
  }
};

// READ: Get a single report by ID
const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findByPk(reportId, {
      include: [
        {
          model: User,
          attributes: ["userId", "email"],
        },
      ],
    });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: "Error fetching report", details: error.message });
  }
};

// UPDATE: Update a report
const updateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const updatedData = req.body;
    const [updatedRows] = await Report.update(updatedData, { where: { reportId } });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Report not found or no changes made" });
    }
    const updatedReport = await Report.findByPk(reportId);
    return res.json({
      status:200,
      success: true,
      data: updatedReport,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating report", details: error.message });
  }
};

// DELETE: Remove a report
const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const deletedRows = await Report.destroy({ where: { reportId } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting report", details: error.message });
  }
};

module.exports = { createReport, getReports, getReportById, updateReport, deleteReport };
