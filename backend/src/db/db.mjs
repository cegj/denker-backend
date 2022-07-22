import mysql from "mysql2"
import dotenv from "dotenv";

dotenv.config();

let options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export const db = mysql.createPool(options)

const firstConn = mysql.connect({
  host: options.host,
  user: options.user,
  password: options.password,
})

firstConn.promise().query(`CREATE DATABASE IF NOT EXISTS ${options.database};`)
.then((err) => {
  if (err){ console.log };

  db.promise().query(`
  CREATE TABLE IF NOT EXISTS users
  (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
  ) ENGINE=INNODB
  `
  )
  .then(() => {

    db.query(`
    CREATE TABLE IF NOT EXISTS denkes
    (
      id INT(11) PRIMARY KEY AUTO_INCREMENT,
      content VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      user_id INT(11) NOT NULL,
      denke_id INT(11),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (denke_id) REFERENCES denkes(id)
    ) ENGINE=INNODB
    `
    );
  
    db.query(`
    CREATE TABLE IF NOT EXISTS follows
    (
      id INT(11) PRIMARY KEY AUTO_INCREMENT,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      followed_id INT(11) NOT NULL,
      follower_id INT(11) NOT NULL,
      FOREIGN KEY (followed_id) REFERENCES users(id),
      FOREIGN KEY (follower_id) REFERENCES users(id)
    ) ENGINE=INNODB
    `)

    db.query(`
    CREATE TABLE IF NOT EXISTS likes
    (
      id INT(11) PRIMARY KEY AUTO_INCREMENT,
      user_id INT(11) NOT NULL,
      denke_id INT(11) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (denke_id) REFERENCES denkes(id),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL
    )
    `);
  })
})