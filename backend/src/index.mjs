import express from "express";
import cors from "cors";
import { db } from "./db/db.mjs";
import { routes } from "./routes/routes.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// config json response
app.use(express.json());
app.use(express.urlencoded( {extended: true }))

// allow cors to frontend
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// public folder for images
app.use(express.static('public'));

// routes
app.use(routes);

// connect to db and start aplication
try {
  app.listen(process.env.PORT)
  console.log("Aplicação em execução")

} catch (error) {
  console.log("Erro ao iniciar a aplicação:")
  console.log(error)
}