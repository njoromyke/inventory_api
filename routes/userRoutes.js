import express from "express";
import {
  registerUser,
  getUserById,
  getUserProfile,
  getUsers,
  authUser,
  deleteUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/auth").post(authUser);
router
  .route("/:id")
  .get(protect, getUserById)
  .delete(protect, deleteUser)
  .put(protect, updateUser);
router
  .route("/profile/:id")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
