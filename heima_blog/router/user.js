const express = require("express");

const router = express.Router();

//引入controller中的处理函数
const contr = require("../controller/user.js");

// 请求登录页面
router.get("/login",contr.getlogin);

// 请求注册页面
router.get("/register",contr.getregister);

//用户注册数据的提交
router.post("/register",contr.postregister);

//用户登录数据的提交
router.post("/login",contr.postlogin);

// 注销页面
router.get("/loginout",contr.loginout);

module.exports = router;