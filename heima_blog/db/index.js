//连接数据库
const mysql = require("mysql");
const coon = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "mysql001"
})

module.exports = coon;