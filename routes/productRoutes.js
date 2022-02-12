import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getProducts).post(protect, createProduct);
router
  .route("/:id")
  .get(protect, getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
