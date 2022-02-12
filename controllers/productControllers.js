import Product from "../models/productModel.js";
import AsyncHandler from "express-async-handler";

// @desc Get all products
// @route GET /api/v1/products
// @access private
const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  if (products) {
    res.status(200).json(products);
  }
  throw new Error("No product found");
});

// @desc Get a single product
// @route GET /api/v1/products/:id
// @access private
const getProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  }
  throw new Error("No product found");
});

// @desc Create a product
// @route POST /api/v1/products
// @access private
const createProduct = AsyncHandler(async (req, res) => {
  const {
    image,
    sku,
    name,
    status,
    price,
    store,
    category,
    brand,
    qty,
    description,
    color,
    size,
    available,
  } = req.body;
  const product = await Product.findOne({ name });
  if (product) {
    res.status(404);
    throw new Error("Product already exists");
  }
  const newProduct = await Product.create({
    image,
    sku,
    name,
    status,
    price,
    store,
    category,
    brand,
    qty,
    description,
    color,
    size,
    available,
  });
  if (newProduct) {
    res.status(201).json(newProduct);
  }
});

// @desc Update a product
// @route PUT /api/v1/products/:id
// @access private
const updateProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.image = req.body.image || product.image;
    product.sku = req.body.sku || product.sku;
    product.name = req.body.name || product.name;
    product.status = req.body.status || product.status;
    product.price = req.body.price || product.price;
    product.store = req.body.store || product.store;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.qty = req.body.qty || product.qty;
    product.description = req.body.description || product.description;
    product.color = req.body.color || product.color;
    product.size = req.body.size || product.size;
    product.available = req.body.available || product.available;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    }

    // throw new Error("No product found");
    throw new Error("No product found");
  }
});

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access private
const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deletedProduct = await product.remove();
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    }
    throw new Error("No product found");
  }
});

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
