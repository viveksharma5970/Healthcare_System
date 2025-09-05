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
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/auth", auth);
app.use("/api/patients", patients);
app.use("/api/doctors", doctors);
app.use("/api/mappings", mappings);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port ${process.env.PORT}`);
  await connectDB();
});
