import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http, { createServer } from "http";
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
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "*",
    },
  },
});

app.get("/", (req, res) => {
  res.send(
    " End points are: <br/> /api/v1/users<br/>  /api/v1/brands<br/> /api/v1/categories <br/> /api/v1/stores /api/v1/attributes <br/> /api/v1/products<br/>  /api/v1/orders <br/> /api/v1/employees"
  );
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

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

export { io };
