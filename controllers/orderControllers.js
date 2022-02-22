import Order from "../models/orderModels.js";
import AsyncHandler from "express-async-handler";

// @desc Get all orders
// @route GET /api/v1/orders
// @access private
const getOrders = AsyncHandler(async (req, res) => {
  // sort orders by createdAt
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("orderItems.product");
  if (orders) {
    res.status(200).json(orders);
  }
  throw new Error("No order found");
});

// @desc Get a single order
// @route GET /api/v1/orders/:id
// @access private
const getOrder = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "orderItems.product"
  );
  if (order) {
    res.status(200).json(order);
  }
  throw new Error("No order found");
});

// @desc Create a order
// @route POST /api/v1/orders
// @access private
const createOrder = AsyncHandler(async (req, res) => {
  const {
    customerName,
    customerPhone,
    customerAddress,
    orderItems,
    totalPrice,
    discount,
    paid,
    shipped,
  } = req.body;

  const newOrder = await Order.create({
    customerName,
    customerPhone,
    customerAddress,
    orderItems,
    totalPrice,
    discount,
    paid,
    shipped,
  });
  if (newOrder) {
    res.status(201).json(newOrder);
  }
  throw new Error("Error creating order");
});

// @desc Update a order
// @route PUT /api/v1/orders/:id
// @access private
const updateOrder = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.customerName = req.body.customerName || order.customerName;
    order.customerPhone = req.body.customerPhone || order.customerPhone;
    order.orderItems = req.body.orderItems || order.orderItems;
    order.customerAddress = req.body.customerAddress || order.customerAddress;
    order.totalPrice = req.body.totalPrice || order.totalPrice;
    order.discount = req.body.discount || order.discount;
    order.paid = req.body.paid || order.paid;
    order.shipped = req.body.shipped || order.shipped;
    const updatedOrder = await order.save();
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    }
    throw new Error("Error updating order");
  }
  throw new Error("No order found");
});

// @desc Delete a order
// @route DELETE /api/v1/orders/:id
// @access private
const deleteOrder = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const deletedOrder = await order.remove();
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    }
    throw new Error("Error deleting order");
  }
  throw new Error("No order found");
});

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
