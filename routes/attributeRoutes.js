import express from "express";
import {
  createAttribute,
  getAttributes,
  deleteAttribute,
  getAttribute,
  updateAttribute,
} from "../controllers/attributeControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAttributes).post(protect, createAttribute);
router
  .route("/:id")
  .get(protect, getAttribute)
  .put(protect, updateAttribute)
  .delete(protect, deleteAttribute);
export default router;
