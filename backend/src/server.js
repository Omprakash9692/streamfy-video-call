import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;

// Path to frontend build (relative to backend/src/server.js)
const frontendDist = path.join(__dirname, "../../frontend/dist");

app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? ["http://localhost:5001", "http://localhost:5173"]
        : "http://localhost:5173",
    credentials: true   //allow frontend to accept cookies
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(frontendDist));
    // SPA fallback: serve index.html for any non-API GET so client-side routing works (/friends, etc.)
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})