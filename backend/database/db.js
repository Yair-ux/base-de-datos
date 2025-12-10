import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "centerbeam.proxy.rlwy.net",
  user: "root",
  password: "XiMjGOrKBPoKGfnLBluHdwxdyBFUJRbG",
  port: 59739,
  database: "railway",
});

export default db;
