const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
//导入cors启用cors跨域共享
const cors = require("cors");
app.use(cors());

const router = require("./06router.js");
app.use(router);

app.get('/',(req,res) => {
    res.send("请求后端API接口成功");
})

app.listen(5001,() => {
    console.log('server is opened');
})