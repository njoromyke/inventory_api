import Order from "../models/orderModels.js";
import AsyncHandler from "express-async-handler";
import { Mpesa } from "mpesa-api";
import { io } from "../server.js";

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

const lipaNaMpesa = AsyncHandler(async (req, res) => {
  const credentials = {
    clientKey: "mqqp3uSNua7xivju5t32jdA7EHyWoQZr",
    clientSecret: "vxG40BsJ9e68hiOm",
    initiatorPassword: "Safaricom979!",
    securityCredential:
      "OVE/WOc3eePOtB5dGCAkIzBm7tG+UJK2BXSpYUv5u0TX9RTuxvDHvemj+8iZdvC/+FWbORc2xTNR2bBG5AvapIAQ2pJfhmek1SoU5+J2g3gDJW8axiGHTl1kKoJEx4N5R8xT/lqUy7PXHJfa4MZOGrcql/Y1Y0TH/qiPx5p7pjEC8olIukX6271XqdcChf8hIScZgLKQB6OVCS2L2/OqsiNOSCI8rV5IFM8oSq1wEAzsGeO1wFX2Xv4Mz6wMWg3TELNseVIj+Gxnm4p/yVtxUfaW8+VUChNO7jqPTBKRrWbXKFOehoTPatiR19Mn+6AR8/INzgTREI92aeYlLbB0Cg==",
    certificatePath: null,
  };
  const environment = "sandbox";

  const mpesa = new Mpesa(credentials, environment);
  try {
    const response = await mpesa.lipaNaMpesaOnline({
      BusinessShortCode: 174379,
      Amount: 1 /* 1000 is an example amount */,
      PartyA: 254723595928,
      PhoneNumber: 254723595928,
      PartyB: 174379,
      CallBackURL:
        "https://inventoryprojo.herokuapp.com/api/v1/orders/callback",
      AccountReference: "Inventory App",
      passKey:
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
      TransactionType: "CustomerPayBillOnline",
    });
    io.emit("querying", response);
  } catch (error) {
    console.log(error);
  }
});

const callback = AsyncHandler(async (req, res) => {
  const b = req.body.Body.stkCallback["ResultDesc"];
  if (b) {
    io.emit("queried", req.body.Body.stkCallback["ResultDesc"]);
  }
  res.json(b);
});
const updatePaymentToPaid = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.paid = true;
    const updatedOrder = await order.save();

    io.emit("payment", updateOrder);
    res.status(200).json(updateOrder);
  } else {
    throw new Error("payment not found");
  }
});

export {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  lipaNaMpesa,
  callback,
  updatePaymentToPaid,
};
