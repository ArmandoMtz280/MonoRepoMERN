/**Servidor */

import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { corsConfig } from "./config/cors";
import dns from "node:dns"
import { connectDB } from "./config/db";
import  projectRoutes from "./routes/projectRoutes";
 


dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config() // para q tome las variables de entorno

connectDB(); // Conexion DB

const app = express(); // server
      app.use(cors(corsConfig)) // permite la conexion con la confi de CORS
      app.use(express.json()) // habilita lectura de json

// Routes
      app.use("/api/projects", projectRoutes);

export default app;