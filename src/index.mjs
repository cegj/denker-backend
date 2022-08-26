import express from "express";
import cors from "cors";
import { routes } from "./routes/routes.mjs";

import dotenv from "dotenv";
dotenv.config();

// starts app
const app = express();

// config json response
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// allow cors to frontend
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// // public folder for images
// // app.set('*/img', express.static(path.join(__dirname, 'public')));
// // app.use('*/img', express.static('public'));
// app.use(express.static('public'));

// routes
app.use(routes);

// connect to db and start aplication
try {
  app.listen(process.env.PORT || 5000)
  console.log("Aplicação em execução")

} catch (error) {
  console.log("Erro ao iniciar a aplicação:")
  console.log(error)
}