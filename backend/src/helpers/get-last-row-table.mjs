import { db } from "../db/db.mjs";

export default async function getLastTableRow(tableName){

  const selectQuery = `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1;`

  const data = await db.promise().query(selectQuery);

  return data[0][0];
}