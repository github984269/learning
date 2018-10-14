const express = require("express");

const router = express.Router();

const contr = require("./07control.js");

//对外暴露getAllHero接口
router.get("/getAllHero",contr.getAllHero);

//对外暴露addlHero接口
router.post("/addHero",contr.addHero)

//根据id 获取英雄列表
router.get("/getheroid/:id",contr.getheroid)

//updatehero根据id 更新英雄数据
router.post("/updatehero/:id",contr.updatehero)

//deletehero根据id 软删除英雄数据
router.get("/deletehero/:id",contr.deletehero)

module.exports = router;
