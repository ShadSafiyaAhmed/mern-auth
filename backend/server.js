

import express from "express";
import cors from "cors"
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(); 
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; 
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";  
const port = process.env.PORT || 5000; 
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js";

connectDB(); 

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))


app.use(cookieParser());

app.use(express.static('backend/public'));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use('/api/users/', userRoutes);

app.use('/api/admin/', adminRoutes);

app.get('/', (req, res) => res.send("Server is ready"));

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));