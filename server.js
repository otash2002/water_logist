import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

dotenv.config({ quiet: true }); 

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Sizga tez va ishonchli suv yetkazib beramiz"});
});
import customersRoutes from './routes/customers.routes.js';
import addressRoutes from './routes/address.routes.js';
import districtsRoutes from './routes/districts.routes.js';

app.use('/api/customers', customersRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/districts', districtsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishga tushdi`));