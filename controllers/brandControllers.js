import Brand from "../models/brandModel.js";
import AsyncHandler from "express-async-handler";

// @desc Get all brands
// @route GET /api/v1/brands
// @access private
const getBrands = AsyncHandler(async (req, res) => {
  const brand = await Brand.find({});
  if (brand) {
    res.status(200).json(brand);
  }
  throw new Error("No brand found");
});

// @desc Get a single brand
// @route GET /api/v1/brands/:id
// @access private
const getBrand = AsyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (brand) {
    res.status(200).json(brand);
  }
  res.status(404);
  throw new Error("No brand found");
});

// @desc Create a brand
// @route POST /api/v1/brands
// @access private
const createBrand = AsyncHandler(async (req, res) => {
  const { name, status } = req.body;
  const brand = await Brand.findOne({ name });
  if (brand) {
    res.status(404);
    throw new Error("Brand already exists");
  }
  const newBrand = await Brand.create({
    name,
    status,
  });
  if (newBrand) {
    res.status(201).json(newBrand);
  }
});

// @desc Update a brand
// @route PUT /api/v1/brands/:id
// @access private
const updateBrand = AsyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (brand) {
    brand.name = brand.name || req.body.name;
    brand.status =  req.body.status;
    const updatedBrand = await brand.save();
    res.status(200).json(updatedBrand);
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});

// @desc Delete a brand
// @route DELETE /api/v1/brands/:id
// @access private
const deleteBrand = AsyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (brand) {
    await brand.remove();
    res.status(200).json("Brand deleted");
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});

export { getBrands, getBrand, createBrand, updateBrand, deleteBrand };
