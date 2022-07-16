import { db } from "../db/db.mjs";
import getLastTableRow from "../helpers/get-last-row-table.mjs";

export default class User{

  static async create(user){

    const query = `
    INSERT INTO users
    (name,
    username,
    email,
    password,
    image,
    createdAt,
    updatedAt)
    VALUES
    ('${user.name}',
    '${user.username}',
    '${user.email}',
    '${user.password}',
    '${user.image}',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP)
    `

    db.query(query);

    return await getLastTableRow('users');  
  }
}