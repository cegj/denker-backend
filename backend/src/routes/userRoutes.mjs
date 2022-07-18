import express from "express";
import multer from "multer";
import { multerConfig } from "../../config/multerConfig.mjs";
import UserController from "../controller/UserController.mjs";

export const userRoutes = express.Router();

userRoutes.post('/create', multer(multerConfig).single('image'), UserController.create)
userRoutes.post('/login', UserController.login)
userRoutes.get('/', UserController.checkUser)
userRoutes.get('/:id', UserController.getUserById)
userRoutes.patch('/', multer(multerConfig).single('image'), UserController.edit)
userRoutes.delete('/', UserController.delete)