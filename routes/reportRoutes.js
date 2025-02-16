const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { createReport, getReports, getReportById, updateReport, deleteReport } = require("../controllers/ReportController");
const {loginJWTAuth} = require("../middlewares/authenticationMiddleware")

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Create a new report
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportTitle:
 *                 type: string
 *               reportType:
 *                 type: string
 *               dateRangeFrom:
 *                 type: string
 *                 format: date
 *               dateRangeTo:
 *                 type: string
 *                 format: date
 *               report:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report created successfully
 *       500:
 *         description: Error creating report
 */
router.post("/create",loginJWTAuth, upload.single("fileUrl"), createReport);

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get all reports
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: List of all reports
 *       500:
 *         description: Error fetching reports
 */
router.get("/get",loginJWTAuth, getReports);

/**
 * @swagger
 * /reports/{reportId}:
 *   get:
 *     summary: Get a report by ID
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to retrieve
 *     responses:
 *       200:
 *         description: Report details
 *       404:
 *         description: Report not found
 *       500:
 *         description: Error fetching report
 */
router.get("/getbyid/:reportId",loginJWTAuth, getReportById);

/**
 * @swagger
 * /reports/{reportId}:
 *   put:
 *     summary: Update a report
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportTitle:
 *                 type: string
 *               reportType:
 *                 type: string
 *               dateRangeFrom:
 *                 type: string
 *                 format: date
 *               dateRangeTo:
 *                 type: string
 *                 format: date
 *               report:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       404:
 *         description: Report not found or no changes made
 *       500:
 *         description: Error updating report
 */
router.put("/update/:reportId",loginJWTAuth, updateReport);

/**
 * @swagger
 * /reports/{reportId}:
 *   delete:
 *     summary: Delete a report
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to delete
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Error deleting report
 */
router.delete("/delete/:reportId",loginJWTAuth, deleteReport);

module.exports = router;
