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
routes.use('/user', express.json(), express.urlencoded({ extended: true }), userRoutes);
routes.use('/denke', express.json(), express.urlencoded({ extended: true }), denkeRoutes);
routes.use('/follow', express.json(), express.urlencoded({ extended: true }), followRoutes);
routes.use('/like', express.json(), express.urlencoded({ extended: true }), likeRoutes);