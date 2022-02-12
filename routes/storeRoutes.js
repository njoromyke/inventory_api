import express from "express";
import { createStore, deleteStore, getStore, getStores, updateStore } from "../controllers/storeControllers";

router.route("/").get(getStores).post(createStore);
router.route("/:id").get(getStore).put(updateStore).delete(deleteStore);
const router = express.Router();
