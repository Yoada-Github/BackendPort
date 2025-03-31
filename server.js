import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/Contact.js"; 

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Contact Form Route
app.use("/contact", contactRoute); 

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)  
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => res.send("🚀 Portfolio API Running"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
