import express from "express";
import { userRoutes } from "./userRoutes.mjs";

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({message: "Hello World"})
})

routes.use('/user', userRoutes);