const { Category , User } = require('../models');
const { Op } = require("sequelize");

// Create a new inventory item
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const user = req.user.userId;
    console.log("USERID",user)
    const category = await Category.create({
        userId : user ,
        name
    });

    res.status(201).json(category );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update inventory item
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const user = req.user.userId;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update({
      name: name || category.name,
    });

    res.status(200).json({
      message: "category updated successfully",
      category,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View inventory item
exports.viewCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const response = {
      name: category.name,
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete inventory item
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all inventory items with pagination
exports.getAllCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const totalCategory = await Category.count();
    const categoryData = await Category.findAll({
      attributes: [
     "name",
     "categoryId",
      ],
      limit: limit,
      offset: offset,
      order: [["categoryId", "ASC"]],
    });

    const formattedCategoryData = categoryData.map((category) => ({
        categoryId: category.categoryId,
      name: category.name,
    
      //addedDate: inventory.createdAt,
    }));

    const totalPages = Math.ceil(totalCategory / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = {
      currentPage: page,
      totalPages,
      limit,
      totalCategory,
      hasNextPage,
      hasPrevPage,
      category: formattedCategoryData,
      nextPage: hasNextPage
        ? `/api/v1/all-category?page=${page + 1}&limit=${limit}`
        : null,
      prevPage: hasPrevPage
        ? `/api/v1/all-category?page=${page - 1}&limit=${limit}`
        : null,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching paginated category data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
