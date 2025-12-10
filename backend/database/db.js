import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "tramway.proxy.rlwy.net",
  user: "root",
  password: "mgnqyZmnUZcjMeOIigXpEuvGmtijiNiz",
  database: "railway",
  port: 26013
});

export default db;
