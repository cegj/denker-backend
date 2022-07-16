import express from "express";
import multer from "multer";
import { multerConfig } from "../../config/multerConfig.mjs";
import UserController from "../controller/UserController.mjs";

export const userRoutes = express.Router();

userRoutes.get('/', (req,res) => {
  res.json({message: "Na rota do usuário"})
})
userRoutes.post('/create', multer(multerConfig).single('image'), UserController.create)