import express from "express";
import {
  createStore,
  deleteStore,
  getStore,
  getStores,
  updateStore,
} from "../controllers/storeControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getStores).post(protect, createStore);
router
  .route("/:id")
  .get(protect, getStore)
  .put(protect,updateStore)
  .delete(protect, deleteStore);

export default router;
