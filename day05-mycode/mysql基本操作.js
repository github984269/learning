//第二步导入包
const mysql = require('mysql');

//第三部创建连接对象
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'node10'
})

//第四部，执行查询方法
/*
conn.query('select *from users',(err,results)=>{
    if(err) return console.log(err.message)
    console.log(results)
})*/

//插入
//执行数据库插入语句set ? 会最终转换成 values(字段1，字段2)这样
//这里对象的属性必须和数据库表里的字段对应起来（属性名=字段名）,这样mysql模块才能把属性名转换成字段名
// conn.query('insert into users set ?',{name:'lisi',age:19,gender:'男'},(err,results)=>{
//     if(err) return console.log(err.message)
//     console.log(results)
// })

//修改
// 修改语句，关于值的地方都用？来代替，然后，在query的第二个参数那里放要替换？的值
// conn.query('update users set ? where id=?',[{name:'李四',age:19,gender:'男'},2],(err,results)=>{
//     if(err) return console.log(err.message)
//     console.log(results)
// })

//删除
// conn.query('delete from users where id =?',2,(err,results)=>{
//     if(err) return console.log(err.message)
//     console.log(results)
// })