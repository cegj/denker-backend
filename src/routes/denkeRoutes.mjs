import express from "express";
import multer from "multer";
import { setDestPath, multerConfig } from "../../config/multerConfig.mjs";
import DenkeController from "../controller/DenkeController.mjs";

export const denkeRoutes = express.Router();

denkeRoutes.get('/', DenkeController.getDenkes);
denkeRoutes.post('/create', setDestPath, multer(multerConfig).single('image'), DenkeController.create)
denkeRoutes.get('/:id', DenkeController.getDenkeById);
denkeRoutes.get('/user/:id', DenkeController.getDenkesByUser);
denkeRoutes.get('/replies/:id', DenkeController.getRepliesById);
denkeRoutes.patch('/:id', setDestPath, multer(multerConfig).single('image'), DenkeController.edit)
denkeRoutes.delete('/:id', DenkeController.delete);