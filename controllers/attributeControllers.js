import Atrribute from "../models/atrributeModel.js";
import AsyncHandler from "express-async-handler";

// @desc Get all attributes
// @route GET /api/v1/attributes
// @access private
const getAttributes = AsyncHandler(async (req, res) => {
  const attributes = await Atrribute.find({});
  if (attributes) {
    res.status(200).json(attributes);
  }
  throw new Error("No attribute found");
});

// @desc Get a single attribute
// @route GET /api/v1/attributes/:id
// @access private
const getAttribute = AsyncHandler(async (req, res) => {
  const attribute = await Atrribute.findById(req.params.id);
  if (attribute) {
    res.status(200).json(attribute);
  }
  throw new Error("No attribute found");
});

// @desc Create a attribute
// @route POST /api/v1/attributes
// @access private
const createAttribute = AsyncHandler(async (req, res) => {
  const { name, status } = req.body;
  const attribute = await Atrribute.findOne({ name });
  if (attribute) {
    res.status(404);
    throw new Error("Attribute already exists");
  }
  const newAttribute = await Atrribute.create({
    name,
    status,
  });
  if (newAttribute) {
    res.status(201).json(newAttribute);
  }
});

// @desc Update a attribute
// @route PUT /api/v1/attributes/:id
// @access private
const updateAttribute = AsyncHandler(async (req, res) => {
  const attribute = await Atrribute.findById(req.params.id);
  if (attribute) {
    attribute.name = req.body.name || attribute.name;
    attribute.status = req.body.status;
    const updatedAttribute = await attribute.save();
    res.status(200).json(updatedAttribute);
  } else {
    res.status(404);
    throw new Error("Attribute not found");
  }
});

// @desc Delete a attribute
// @route DELETE /api/v1/attributes/:id
const deleteAttribute = AsyncHandler(async (req, res) => {
  const attribute = await Atrribute.findById(req.params.id);
  if (attribute) {
    await attribute.remove();
    res.status(200).json({ message: "Attribute deleted" });
  } else {
    res.status(404);
    throw new Error("Attribute not found");
  }
});

export {
  getAttributes,
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
};
