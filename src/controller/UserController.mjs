import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import { createUserToken } from "../helpers/create-user-token.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";
import deleteImgFile from "../helpers/delete-img-file.mjs";

export default class UserController {

  static async create(req, res) {

    const { name, username, email, password, confirmpassword } = req.body;
    const image = req.file.filename;

    // validate fields 

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" })
      return
    }
    if (!username) {
      res.status(422).json({ message: "O nome de usuário é obrigatório" })
      return
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" })
      return
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatória" })
      return
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: "A senha e a confirmação de senha devem ser iguais" })
      return
    }

    const usedEmail = await User.retrieve({ email });
    if (usedEmail.length !== 0) {
      res.status(422).json({ message: "O e-mail já está em uso. Faça login ou escolha outro e-mail." })
      return
    }

    const usedUsername = await User.retrieve({ username });
    if (usedUsername.length !== 0) {
      res.status(422).json({ message: "O nome de usuário já está em uso, escolha outro." })
      return
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      username,
      email,
      password: passwordHash,
      image
    }

    try {

      const createdUser = await User.create(newUser);

      createUserToken(createdUser, req, res, "Usuário criado com sucesso");

    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "UserController.create" })
    }
  }

  static async login(req, res) {

    const { email, password } = req.body;

    console.log(email, password)

    let user = await User.retrieve({ email });
    user = user[0]

    if (!user) {
      res.status(422).json({ message: "O usuário não foi encontrado, verifique o e-mail" });
      return
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      res.status(422).json({ message: "Senha incorreta, tente novamente" });
      return
    }

    createUserToken(user, req, res, "Usuário autenticado com sucesso");
  }

  static async checkUser(req, res) {
    let user = await getUserByToken(req, res);

    if (!user) {
      res.status(404).json({ message: "O usuário não foi encontrado" });
    }

    user.password = undefined;

    res.status(200).json({ user });
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    if (!id) {
      res.status(422).json({ message: "O id do usuário não foi informado" });
      return
    }

    let user = await User.retrieve({ id });
    user = user[0];

    if (!user) {
      res.status(404).json({ message: "Id inválido, o usuário não foi encontrado" });
      return
    }

    user.password = undefined;
    res.status(200).json({ user });
  }

  static async findUser(req, res) {
    const query = req.query.q;

    if (!query) {
      res.status(422).json({ message: "Não foram informados parâmetros de busca" });
      return
    }

    let result = [];
    result.push(await User.retrieve({ name: query }, true));
    result.push(await User.retrieve({ username: query }, true));
    result.push(await User.retrieve({ email: query }, true));

    console.log(result)

    //Remove duplicated results
    result = [...new Set(result[0])]

    //Remove passwords from results
    result.forEach((r) => {
      r.password = undefined;
    })

    res.status(200).json({ result });
  }

  static async edit(req, res) {

    let dataToUpdate = {}

    if (!req.headers.authorization) {
      res.status(422).json({ message: "O token de autenticação não foi informado" })
      return
    }

    const user = await getUserByToken(req, res);

    if (!user) {
      res.status(404).json({ message: "O usuário não foi encontrado" });
      return
    }

    const { name, username, email, password, confirmpassword } = req.body;

    // validate fields 

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" })
      return
    }
    dataToUpdate.name = name;

    if (!username) {
      res.status(422).json({ message: "O nome de usuário é obrigatório" })
      return
    }
    dataToUpdate.username = username;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" })
      return
    }
    dataToUpdate.email = email;

    if (password) {
      if (!confirmpassword) {
        res.status(422).json({ message: "A confirmação de senha é obrigatória" })
        return
      }

      if (password !== confirmpassword) {
        res.status(422).json({ message: "A senha e a confirmação de senha devem ser iguais" })
        return
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      dataToUpdate.password = passwordHash;
    }

    let usedEmail = await User.retrieve({ email: email });
    usedEmail = usedEmail[0]

    if (usedEmail && usedEmail.id !== user.id) {
      res.status(422).json({ message: "O e-mail já está em uso. Faça login ou escolha outro e-mail." })
      return
    }

    let usedUsername = await User.retrieve({ username });
    usedUsername = usedUsername[0]

    if (usedUsername && usedUsername.id !== user.id) {
      res.status(422).json({ message: "O nome de usuário já está em uso, escolha outro." })
      return
    }

    if (req.file) {
      deleteImgFile(user.image, 'user');
      dataToUpdate.image = req.file.filename;
    }

    try {

      const updatedUser = await User.update({ id: user.id }, dataToUpdate);

      console.log(updatedUser)

      createUserToken(updatedUser, req, res, "Usuário alterado com sucesso");

    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "UserController.edit" })
    }

  }

  static async delete(req, res) {

    if (!req.headers.authorization) {
      res.status(422).json({ message: "O token de autenticação não foi informado" })
      return
    }

    const user = await getUserByToken(req, res);

    if (!user) {
      res.status(404).json({ message: "O usuário não foi encontrado" });
      return
    }

    deleteImgFile(user.image, 'user');

    try {

      const deletedUser = await User.delete({ id: user.id });

      res.status(200).json({ message: "Usuário removido com sucesso" })

    } catch (error) {
      res.status(500).json({ message: error, errorOrigin: "UserController.delete" })
    }
  }
}