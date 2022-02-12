import Category from "../models/categoryModel.js";
import AsyncHandler from "express-async-handler";

// @desc Get all categories
// @route GET /api/v1/categories
// @access private
const getCategories = AsyncHandler(async (req, res) => {
  const categories = await Category.find({});
  if (categories) {
    res.status(200).json(categories);
  }
  throw new Error("No category found");
});

// @desc Get a single category
// @route GET /api/v1/categories/:id
// @access private
const getCategory = AsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.status(200).json(category);
  }
  throw new Error("No category found");
});

// @desc Create a category
// @route POST /api/v1/categories
// @access private
const createCategory = AsyncHandler(async (req, res) => {
  const { name, status } = req.body;
  const category = await Category.findOne({ name });
  if (category) {
    res.status(404);
    throw new Error("Category already exists");
  }
  const newCategory = await Category.create({
    name,
    status,
  });
  if (newCategory) {
    res.status(201).json(newCategory);
  }
});

// @desc Update category
//  @route PUT /api/v1/categories/:id
// @access private

const updateCategory = AsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = req.body.name || category.name;
    category.status = req.body.status;
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc Delete a category
// @route DELETE /api/v1/categories/:id
const deleteCategory = AsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.status(200).json({ message: "Category deleted" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
