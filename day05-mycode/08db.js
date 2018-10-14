//引入并连接数据库
const mysql = require("mysql");
const coon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mysql001"
})

module.exports = coon;