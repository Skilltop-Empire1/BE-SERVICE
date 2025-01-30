const { Report } = require("../models");

// CREATE: Add a new report
const createReport = async (req, res) => {
  try {
    const reportData = req.body;
    const newReport = await Report.create(reportData);
    return res.json({
      status:200,
      success: true,
      data: newReport,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating report", details: error.message });
  }
};

// READ: Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reports", details: error.message });
  }
};

// READ: Get a single report by ID
const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findByPk(reportId);
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
