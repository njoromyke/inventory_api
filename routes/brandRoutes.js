import express from "express";
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, admin, getBrands)
  .post(protect, admin, createBrand);
router
  .route("/:id")
  .get(protect, admin, getBrand)
  .delete(protect, admin, deleteBrand)
  .put(protect, admin, updateBrand);

export default router;
