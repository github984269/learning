//引入mysql
const mysql = require('mysql');

//连接数据库
const coon = mysql.createConnection({
    host:'localhost',
    user: "root",
    password: "root",
    database: "node1"
})

//执行sql语句
// const sql = 'select * from user';

// coon.query(sql,(err,result) => {
//     if(err) return console.log(err.message);
//     console.log(result)
// })

// //插入sql语句
// coon.query('insert into user set ?',{name:'李四',age: 21, gender: '男'},(err,result) => {
//         if(err) return console.log(err.message);
//         console.log(result)
// })

// //修改语句
// coon.query('update user set ? where id = ?',[{name:'李哈哈',age: 21, gender: '男'},2],(err,result) => {
//         if(err) return console.log(err.message);
//         console.log(result)
// })

//删除语句
coon.query('delete from user where id = ?',2,(err,result) => {
    if(err) return console.log(err.message);
    console.log(result)
})