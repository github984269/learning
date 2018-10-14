const express = require("express");

const router = express.Router();

//导入文章页面请求的处理函数模块
const contr1 = require("../controller/article.js")

router.get("/article/add",contr1.article);

//请求提交文章数据页面
router.post("/article/add",contr1.addarticle);

//请求文章详情页面
router.get("/article/info/:id",contr1.info);

//请求编辑页面
router.get("/article/showedit/:id",contr1.showedit);

//点击完成编辑
router.post("/article/showedit",contr1.finishedit);

module.exports = router;
