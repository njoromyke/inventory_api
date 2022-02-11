import express from "express";
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getBrands).post(protect, createBrand);
router
  .route("/:id")
  .get(protect, getBrand)
  .delete(protect, deleteBrand)
  .put(protect, updateBrand);

export default router;
