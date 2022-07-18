import Follow from "../models/Follow.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";

export default class FollowController{

  static async follow(req, res){

    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    const followed_id = +req.params.id;

    //Check if user to follow is the same user who follows
    if(followed_id === user.id){
      res.status(422).json({message: "Você não pode seguir a si mesmo"});
      return
    }

    //Check if user is already followed
    const alreadyFollowedUsers = await Follow.retrieve({follower_id: user.id});
    let userAlreadyFollowed = false;
    alreadyFollowedUsers.forEach((followedUser) => {
      if (followedUser.followed_id === followed_id){
        userAlreadyFollowed = true;
      }
    })
    if (userAlreadyFollowed){
      res.status(422).json({message: "Você já segue este usuário"});
      return
    }

    const follow = {
      followed_id,
      follower_id: user.id
    }


    try {

      const followedUser = await Follow.create(follow);

      res.status(200).json({message: `Você seguiu o usuário @${followedUser[0].username}`, followedUser})
      
    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "FollowController.follow" })
    }    


  }

  static async unfollow(req, res){

    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    const followed_id = +req.params.id;

    //Check if user to unfollow is the same user who follows
    if(followed_id === user.id){
      res.status(422).json({message: "Você não pode deixar de seguir a si mesmo"});
      return
    }

    //Check if user is really followed
    const alreadyFollowedUsers = await Follow.retrieve({follower_id: user.id});
    let userAlreadyFollowed = false;
    alreadyFollowedUsers.forEach((followedUser) => {
      if (followedUser.followed_id === followed_id){
        userAlreadyFollowed = true;
      }
    })
    if (!userAlreadyFollowed){
      res.status(422).json({message: "Você não segue este usuário"});
      return
    }

    const follow = {
      followed_id,
      follower_id: user.id
    }

    try {

      const unfollowedUser = await Follow.delete(follow);

      res.status(200).json({message: `Você deixou de seguir o usuário @${unfollowedUser[0].username}`, unfollowedUser})
      
    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "FollowController.unfollow" })
    }    

  }

}