import express from "express";
import multer from "multer";
import { multerConfig } from "../../config/multerConfig.mjs";
import DenkeController from "../controller/DenkeController.mjs";

export const denkeRoutes = express.Router();

denkeRoutes.post('/create', multer(multerConfig).single('image'), DenkeController.create)
denkeRoutes.get('/:id', DenkeController.getDenkeById);