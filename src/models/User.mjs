import { db } from "../db/db.mjs";
import getLastTableRow from "../helpers/get-last-row-table.mjs";

export default class User {

  static async create(user) {

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

    try {

      await db.promise().query(query);
      return await getLastTableRow('users');

    } catch (error) {
      console.log(error)
      return new Error(error);
    }

  }

  static async retrieve(filter, like = false) {

    //Create string with filter to find user
    let filterQuery = "";
    if (filter) {
      const field = Object.keys(filter)[0];
      let value = filter[field];

      if (like) filterQuery = `WHERE ${field} LIKE '%${value}%'`
      else {
        if (typeof (value) === "string") {
          value = `'${value}'`
        }
        filterQuery = `WHERE ${field} = ${value}`
      }
    }

    const query = `SELECT * FROM users ${filterQuery}`

    try {

      const user = await db.promise().query(query);
      return user[0];

    } catch (error) {
      console.log(error)
      return new Error(error);
    }

  }

  static async update(filter, valuesToUpdate) {

    const toUpdateData = Object.entries(valuesToUpdate);

    //Create string with values to update
    let updateString = "";
    toUpdateData.forEach((data) => {
      updateString += `${data[0]} = '${data[1]}',`
    })

    //Create string with filter to find user
    let filterQuery = "";
    if (filter) {
      const field = Object.keys(filter)[0];
      let value = filter[field];

      if (typeof (value) === "string") {
        value = `'${value}'`
      }

      filterQuery = `${field} = ${value}`
    }

    const query = `
    UPDATE
    users
    SET
    ${updateString}
    updatedAt = CURRENT_TIMESTAMP
    WHERE
    ${filterQuery}
    `

    try {

      await db.promise().query(query);
      const updatedUser = await User.retrieve(filter);
      return updatedUser;

    } catch (error) {
      console.log(error)
      return new Error(error);
    }
  }

  static async delete(filter) {

    //Create string with filter to find user
    let filterQuery = "";
    if (filter) {
      const field = Object.keys(filter)[0];
      let value = filter[field];

      if (typeof (value) === "string") {
        value = `'${value}'`
      }

      filterQuery = `${field} = ${value}`
    }

    const query = `DELETE FROM users WHERE ${filterQuery}`

    try {

      const deletedUser = await User.retrieve(filter);
      await db.promise().query(query);
      return deletedUser;

    } catch (error) {
      console.log(error)
      return new Error(error);
    }
  }
}