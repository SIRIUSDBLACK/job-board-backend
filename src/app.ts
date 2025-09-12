import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import jobRoutes from "./routes/job.routes"
import applicationRoutes from "./routes/application.routes"
import adminRoutes from "./routes/admin.routes"
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/job",jobRoutes)
app.use("/api/application",applicationRoutes)
app.use("/api/admin",adminRoutes )

export default app;