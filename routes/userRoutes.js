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

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/auth").post(authUser);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);
router.route("/profile/:id").get(getUserProfile).put(updateUserProfile);


export default router;
