import express from "express";
import { userRoutes } from "./userRoutes.mjs";
import { denkeRoutes } from "./denkeRoutes.mjs";
import { followRoutes } from "./followRoutes.mjs";
import { likeRoutes } from "./likeRoutes.mjs";
import path from 'path';
import { fileURLToPath } from "url";

// define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ message: "Welcome to Denker api" })
})

console.log

routes.use('/public', express.static('public'));
routes.use('/user', userRoutes);
routes.use('/denke', denkeRoutes);
routes.use('/follow', followRoutes);
routes.use('/like', likeRoutes);