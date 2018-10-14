const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

//引入并连接数据库
const mysql = require("mysql");
const coon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mysql001"
})

//对外暴露getAllHero接口
app.get("/getAllHero",(req,res) => {
    const sql = "select * from heros";
    coon.query(sql,(err,result) => {
        if(err) return res.send({statu:500,mes:err.message,data: null})
        res.send({statu:200,mes:'ok',data: result})
    })
})

//对外暴露addlHero接口
app.post("/addHero",(req,res) => {

    const hero = req.body;

    const dt = new Date();
    let y = dt.getFullYear();
    let m = dt.getMonth().toString().padStart(2,'0');
    let d = dt.getDay().toString().padStart(2,'0');
    let hh = dt.getHours().toString().padStart(2,'0');
    let mm = dt.getMinutes().toString().padStart(2,'0');
    let ss = dt.getSeconds().toString().padStart(2,'0');

    hero.ctime = y+"-"+m+"-"+d+" "+hh+":"+mm+":"+ss;

    const sql = "insert into  heros set ?";
    coon.query(sql,hero,(err,result) => {
        if(err) return res.send({statu:500,mes:err.message,data: null})
        res.send({statu:200,mes:'ok',data: null})
    })
})


//对外暴露getheroid接口,根据ix获取英雄信息
app.get("/getheroid/:id",(req,res) => {
    const id = req.params.id;
    const sql= "select * from heros where id = ?";
    coon.query(sql,id,(err,result) => {
        if(err) return res.send({statu:500,mes:err.message,data:null})
        res.send({statu:200,mes:'ok',data:result})
    })
})

//对外暴露updatehero接口根据id更新英雄信息
app.post("/updatehero/:id",(req,res) => {
    const id = req.params.id;
    const newHero = req.body;
    const sql = "update heros set ? where id = ?";
    coon.query(sql,[newHero,id],(err,result) => {
        if(err) return res.send({statu:500,mes:err.message,data:null})
        res.send({statu:200,mes:'ok',data:null})
    })
})

//对外暴露deletehero接口根据id软删除英雄信息
app.get("/deletehero/:id",(req,res) => {
    const id = req.params.id;
    const sql = "update heros set isdel = 1 where id = ?"
    coon.query(sql,id,(err,result) => {
        if(err) return res.send({statu:500,mes:err.message,data:null})
        res.send({statu:200,mes:'ok',data:null})
    })
})

app.get('/',(req,res) => {
    res.send("请求后端API接口成功");
})

app.listen(5001,() => {
    console.log('server is opened');
})