import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
  res.send(" End points are: /api/v1/users, /api/v1/brands, /api/v1/categories, /api/v1/stores, /api/v1/attributes, /api/v1/products, /api/v1/orders, /api/v1/employees");
});

// api end points
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/attributes", attributeRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/employees", employeeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Api running on port ${PORT}`);
});
