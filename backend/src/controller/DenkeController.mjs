import Denke from "../models/Denke.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";

export default class DenkeController{

  static async create(req, res){

    if(!req.headers.authorization){
      res.status(422).json({message: "O token de autenticação não foi informado"})
      return
    }

    const user = await getUserByToken(req, res);

    if(!user){
      res.status(404).json({message: "O usuário não foi encontrado"});
      return
    }

    const denke = {}

    denke.content = req.body.content;

    if(req.file){
      denke.image = req.file.filename;
    }

    denke.user_id = user.id;

    if (req.body.reply_to){
      denke.denke_id = req.body.reply_to;
    } else {
      denke.denke_id = "NULL";
    }

    try {
      
      const createdDenke = await Denke.create(denke);
      res.status(200).json({message: "Denke criado com sucesso", createdDenke})

    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "DenkeController.create" })
    }
    

  }

}