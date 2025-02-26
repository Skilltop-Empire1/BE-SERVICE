const express = require("express");
const router = express.Router();
const {
  createFinanceRecord,
  getFinanceRecords,
  getFinanceRecordById,
  updateFinanceRecord,
  deleteFinanceRecord,
} = require("../controllers/FinanceController");
const upload = require("../middlewares/multer");
const { loginJWTAuth } = require("../middlewares/authenticationMiddleware");

/**
 * @swagger
 * /finance:
 *   post:
 *     summary: Create a new finance record
 *     tags:
 *       - Finance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expenseCategory:
 *                 type: string
 *               expensesDescription:
 *                 type: string
 *               amount:
 *                 type: number
 *               dateOfExpenses:
 *                 type: string
 *                 format: date
 *               paymentMethod:
 *                 type: string
 *               vendorPayee:
 *                 type: string
 *               note:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               capexCategory:
 *                 type: string
 *               assetDescription:
 *                 type: string
 *               expectedLifeSpan:
 *                 type: string
 *               depreciationRate:
 *                 type: number
 *     responses:
 *       201:
 *         description: Finance record created successfully
 *       500:
 *         description: Error creating finance record
 */
router.post("/create", loginJWTAuth,upload.single("fileUrl"), createFinanceRecord);

/**
 * @swagger
 * /finance:
 *   get:
 *     summary: Get all finance records with optional filtering by CAPEX and OPEX
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [capex, opex]
 *         description: Filter records by type (CAPEX or OPEX)
 *     responses:
 *       200:
 *         description: List of all finance records
 *       500:
 *         description: Error fetching finance records
 */
router.get("/get", loginJWTAuth, getFinanceRecords);

/**
 * @swagger
 * /finance/{financeId}:
 *   get:
 *     summary: Get a finance record by ID
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: path
 *         name: financeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the finance record to retrieve
 *     responses:
 *       200:
 *         description: Finance record details
 *       404:
 *         description: Finance record not found
 *       500:
 *         description: Error fetching finance record
 */
router.get("/getbyid/:financeId", loginJWTAuth, getFinanceRecordById);

/**
 * @swagger
 * /finance/{financeId}:
 *   put:
 *     summary: Update a finance record
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: path
 *         name: financeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the finance record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expenseCategory:
 *                 type: string
 *               expensesDescription:
 *                 type: string
 *               amount:
 *                 type: number
 *               dateOfExpenses:
 *                 type: string
 *                 format: date
 *               paymentMethod:
 *                 type: string
 *               vendorPayee:
 *                 type: string
 *               note:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               capexCategory:
 *                 type: string
 *               assetDescription:
 *                 type: string
 *               expectedLifeSpan:
 *                 type: string
 *               depreciationRate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Finance record updated successfully
 *       404:
 *         description: Finance record not found or no changes made
 *       500:
 *         description: Error updating finance record
 */
router.put("/update/:financeId", loginJWTAuth, updateFinanceRecord);

/**
 * @swagger
 * /finance/{financeId}:
 *   delete:
 *     summary: Delete a finance record
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: path
 *         name: financeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the finance record to delete
 *     responses:
 *       200:
 *         description: Finance record deleted successfully
 *       404:
 *         description: Finance record not found
 *       500:
 *         description: Error deleting finance record
 */
router.delete("/delete/:financeId", loginJWTAuth, deleteFinanceRecord);

module.exports = router;
