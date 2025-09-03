import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import jobRoutes from "./routes/job.routes"
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes)
app.use("/api/job",jobRoutes)

export default app;