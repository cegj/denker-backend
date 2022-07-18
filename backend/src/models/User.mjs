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

  static async retrieve(filter){

    let filterQuery = "";
    if(filter){
      const field = Object.keys(filter)[0];
      const value = filter[field];
      filterQuery = `WHERE ${field} = '${value}'`
    }

    const query = `SELECT * FROM users ${filterQuery}`

    const user = await db.promise().query(query);

    if(filter){
      return user[0][0];
    } else {
    return user[0];
    }
  }

  static async update(filter, valuesToUpdate){

    let updateString = "";
    for (key in valuesToUpdate){

      console.log(key)

      updateString += `${key} = ${valuesToUpdate[key]},`
    }
      updateString = updateString.slice(0, -1); //remove last comma

    console.log(updateString);

    let filterQuery = "";
    if(filter){
      const field = Object.keys(filter)[0];
      const value = filter[field];
      filterQuery = `WHERE ${field} = '${value}'`
    }

    const query = `
    UPDATE
    users
    SET
    ${updateString}
    WHERE
    ${filterQuery}`

    console.log(query)

    const user = await db.promise().query(query);

    console.log(user);

    if(filter){
      return user[0][0];
    } else {
    return user[0];
    }

  }
}