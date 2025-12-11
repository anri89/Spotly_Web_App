// server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import indexRoutes from "./routes/indexRoutes.js";
import spotRoutes from "./routes/spotRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// EJS view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB (optional for now)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/spotly";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("MongoDB connection failed:", err));

// Routes
app.use("/", indexRoutes);
app.use("/spots", spotRoutes);
app.use("/users", userRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("error", { message: "Page not found" });
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Spotly running on http://localhost:${PORT}`)
);
