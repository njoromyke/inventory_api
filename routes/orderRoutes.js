import express from "express";
import {
  callback,
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  lipaNaMpesa,
  updateOrder,
  updatePaymentToPaid,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getOrders).post(protect, createOrder);
router.route("/callback").post(callback);
router.route("/lipa-na-mpesa").get(lipaNaMpesa);
router.route("/update/:id").put(protect, updatePaymentToPaid);
router
  .route("/:id")
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);
export default router;
