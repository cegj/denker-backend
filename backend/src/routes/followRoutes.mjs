import express from "express";
import FollowController from "../controller/FollowController.mjs";

export const followRoutes = express.Router();

followRoutes.get('/followings/:id', FollowController.getFollowings);
followRoutes.get('/followers/:id', FollowController.getFollowers);
followRoutes.post('/:id', FollowController.follow);
followRoutes.delete('/:id', FollowController.unfollow);