const express = require("express");
const fs = require("fs");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))

//node_modules下的文件必须要托管才能被外部引用
app.use("/node_modules",express.static("./node_modules"));

app.set("view engine","ejs");
app.set("views","./views");

//引入express-session
const session = require("express-session");
//使用session中间件，使用了session中间件就可以使用req.session
app.use(session({
    secret: 'keyboard cat', // 相当于是一个加密密钥，值可以是任意字符串
    resave: false, // 强制session保存到session store中
    saveUninitialized: false // 强制没有“初始化”的session保存到storage中
  }))

//循环自动注册路由模块
fs.readdir(__dirname+"/router",(err,filenames) => {
    if(err) return console.log("读取失败");
    // console.log(filenames) [ 'index.js', 'user.js' ]
    for(var i = 0; i < filenames.length; i ++) {
        const router1 = require("./router/"+filenames[i]);
        app.use(router1);
    }
})

app.listen(80,() => {
    console.log("server open")
})