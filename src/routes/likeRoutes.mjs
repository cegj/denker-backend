import express from "express";
import LikeController from "../controller/LikeController.mjs";

export const likeRoutes = express.Router();

likeRoutes.post('/:id', LikeController.like);
likeRoutes.delete('/:id', LikeController.unlike);
likeRoutes.get('/user/:id', LikeController.getUserLikes);
likeRoutes.get('/denke/:id', LikeController.getDenkeLikes);