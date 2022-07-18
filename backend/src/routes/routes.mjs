import express from "express";
import { userRoutes } from "./userRoutes.mjs";
import { denkeRoutes } from "./denkeRoutes.mjs";
import { followRoutes } from "./followRoutes.mjs";

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({message: "Welcome to Denker api"})
})

routes.use('/user', userRoutes);
routes.use('/denke', denkeRoutes);
routes.use('/follow', followRoutes);