import Like from "../models/Like.mjs";
import Denke from "../models/Denke.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";

export default class LikeController{

  static async like(req, res){

    let like = {}

    // check user
    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    like.user_id = user.id;

    // check if params contains id
    const denke_id = req.params.id;

    if (!denke_id){
      res.status(422).json({message: "O id do Denke não foi informado"})
    }

    // check if denke exists
    let denke = Denke.retrieve({id: denke_id});

    if (!denke){
      res.status(404).json({message: "O Denke não foi localizado"})
      return
    }

    like.denke_id = denke_id;

    // check if user already liked denke
    const alreadyLiked = await Like.retrieve(like);

    if (alreadyLiked[0]){
      res.status(404).json({message: "O usuário já curtiu este denke"})
      return
    }

    try {

      const likedDenke = await Like.create(like);
      res.status(200).json({message: "Denke curtido com sucesso", likedDenke})
      
    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "LikeController.like" })
    }  

  }

  static async unlike(req,res){

    let like = {}

    // check user
    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    like.user_id = user.id;

    // check if params contains id
    const denke_id = req.params.id;

    if (!denke_id){
      res.status(422).json({message: "O id do Denke não foi informado"})
      return
    }

    // check if denke exists
    let denke = Denke.retrieve({id: denke_id});

    if (!denke){
      res.status(404).json({message: "O Denke não foi localizado"})
      return
    }

    like.denke_id = denke_id;

    // check if user likess denke
    const userLikesDenkes = await Like.retrieve(like);

    if (!userLikesDenkes[0]){
      res.status(404).json({message: "O usuário não curtiu este denke"})
      return
    }

    try {

      const unlikedDenke = await Like.delete(like);
      res.status(200).json({message: "Denke descurtido com sucesso", unlikedDenke})
      
    } catch (error) {

      res.status(500).json({ message: error, errorOrigin: "LikeController.unlike" })

    }  

  }

  static async getUserLikes(req, res){

  }

  static async getDenkeLikes(req, res){

  }
}