const { Inventory } = require('../models');
const { inventorySchema } = require('../validation/inventoryValidation');
const { Op } = require("sequelize");

// Create a new inventory item
exports.createInventory = async (req, res) => {
  try {
    const { error } = inventorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { itemName, category, itemId, quantity, totalValue, assignedTo, datePurchased, note } = req.body;
    const inventory = await Inventory.create({
      itemName,
      category,
      itemId,
      quantity,
      totalValue,
      assignedTo,
      datePurchased,
      note,
    });

    res.status(201).json(inventory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update inventory item
exports.updateInventory = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const { itemName, category, itemId, quantity, totalValue, assignedTo, datePurchased, note } = req.body;

    const { error } = inventorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const inventory = await Inventory.findByPk(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    await inventory.update({
      itemName: itemName || inventory.itemName,
      category: category || inventory.category,
      itemId: itemId || inventory.itemId,
      quantity: quantity || inventory.quantity,
      totalValue: totalValue || inventory.totalValue,
      assignedTo: assignedTo || inventory.assignedTo,
      datePurchased: datePurchased || inventory.datePurchased,
      note: note || inventory.note,
    });

    res.status(200).json({
      message: "Inventory item updated successfully",
      inventory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View inventory item
exports.viewInventory = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const inventory = await Inventory.findByPk(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    const response = {
      itemName: inventory.itemName,
      category: inventory.category,
      itemId: inventory.itemId,
      quantity: inventory.quantity,
      totalValue: inventory.totalValue,
      assignedTo: inventory.assignedTo,
      datePurchased: inventory.datePurchased,
      note: inventory.note,
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete inventory item
exports.deleteInventory = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const inventory = await Inventory.findByPk(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    await inventory.destroy();
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all inventory items with pagination
exports.getAllInventory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const totalInventory = await Inventory.count();
    const inventoryData = await Inventory.findAll({
      attributes: [
        "inventoryId",
        "itemName",
        "category",
        "itemId",
        "quantity",
        "totalValue",
        "assignedTo",
        "datePurchased",
        "note",
        "createdAt",
      ],
      limit: limit,
      offset: offset,
      order: [["inventoryId", "ASC"]],
    });

    const formattedInventoryData = inventoryData.map((inventory) => ({
      inventoryId: inventory.inventoryId,
      itemName: inventory.itemName,
      category: inventory.category,
      itemId: inventory.itemId,
      quantity: inventory.quantity,
      totalValue: inventory.totalValue,
      assignedTo: inventory.assignedTo,
      datePurchased: inventory.datePurchased,
      note: inventory.note,
      addedDate: inventory.createdAt,
    }));

    const totalPages = Math.ceil(totalInventory / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = {
      currentPage: page,
      totalPages,
      limit,
      totalInventory,
      hasNextPage,
      hasPrevPage,
      inventory: formattedInventoryData,
      nextPage: hasNextPage
        ? `/api/IMS/all-inventory?page=${page + 1}&limit=${limit}`
        : null,
      prevPage: hasPrevPage
        ? `/api/IMS/all-inventory?page=${page - 1}&limit=${limit}`
        : null,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching paginated inventory data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
