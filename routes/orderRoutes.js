import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orderControllers.j";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getOrders).post(protect, createOrder);
router
  .route("/:id")
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);
export default router;
