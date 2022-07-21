import express from "express";
import multer from "multer";
import { multerConfig } from "../../config/multerConfig.mjs";
import DenkeController from "../controller/DenkeController.mjs";

export const denkeRoutes = express.Router();

denkeRoutes.get('/', DenkeController.getDenkes);
denkeRoutes.post('/create', multer(multerConfig).single('image'), DenkeController.create)
denkeRoutes.get('/:id', DenkeController.getDenkeById);
denkeRoutes.patch('/:id', DenkeController.edit);
denkeRoutes.delete('/:id', DenkeController.delete);