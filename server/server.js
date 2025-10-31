import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import auth from "./src/routes/auth.routes.js";
import patients from "./src/routes/patients.routes.js";
import doctors from "./src/routes/doctors.router.js";
import mappings from "./src/routes/mappings.routes.js";
import { connectDB } from "./src/lib/database.lib.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin:["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

// ✅ Routes
app.get("/api", (req, res) => {
  res.send("Welcome to Healthcare Manager API!");
});

app.use("/api/auth", auth);
app.use("/api/patients", patients);
app.use("/api/doctors", doctors);
app.use("/api/mappings", mappings);


// ✅ Connect DB
await connectDB();

// ✅ Start server (for Render)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
