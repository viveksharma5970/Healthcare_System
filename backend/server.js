import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

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
    origin: process.env.CLIENT_URL || "http://localhost:5173",
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

// ✅ Serve frontend (after build)
const clientPath = path.join(__dirname, "client");
app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ✅ Connect DB
await connectDB();

// ✅ For local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Server running on port ${PORT}`)
  );
}

// ✅ For Vercel
export default app;
