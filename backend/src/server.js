import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// API Routes
app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

app.use("/api", apiRoutes);

// Serve Static Frontend (from backend/dist)
const staticPath = path.join(__dirname, "../dist");
app.use(express.static(staticPath));

// Catch-all route to serve the React app for any other request (e.g. React Router)
app.get(/.*/, (req, res, next) => {
    // Exclude API routes from serving index.html
    if (req.originalUrl.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
        if (err) {
            next();
        }
    });
});

// Custom Error Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



