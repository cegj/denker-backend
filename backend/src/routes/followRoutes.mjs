import express from "express";
import FollowController from "../controller/FollowController.mjs";

export const followRoutes = express.Router();

followRoutes.post('/:id', FollowController.follow);
followRoutes.delete('/:id', FollowController.unfollow);