const express = require("express");

const router = express.Router();

//引入controller中的处理函数
const contr = require("../controller/index.js");


//请求首页
router.get("/",contr.shou);

module.exports = router;