//引入连接数据库的代码
const coon = require("./08db.js");

const contr = {
    getAllHero: (req,res) => {
        const sql = "select * from heros";
        coon.query(sql,(err,result) => {
            if(err) return res.send({statu:500,mes:err.message,data: null})
            res.send({statu:200,mes:'ok',data: result})
        })
    },
    addHero: (req,res) => {

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
    },
    getheroid: (req,res) => {
        const id = req.params.id;
        const sql= "select * from heros where id = ?";
        coon.query(sql,id,(err,result) => {
            if(error) return res.send({statu:500,mes:err.message,data:null})
            res.send({statu:200,mes:'ok',data:result})
        })
    },
    updatehero: (req,res) => {
        const id = req.params.id;
        const newHero = req.body;
        const sql= "update heros set ? where id = ?";
        coon.query(sql,[newHero,id],(err,result) => {
            if(err) return res.send({statu:500,mes:err.message,data:null})
            res.send({statu:200,mes:'ok',data:null})
        })
    },
    deletehero: (req,res) => {
        const id = req.params.id;
        const sql= "update heros set isdel=1 where id = ?";
        coon.query(sql,id,(err,result) => {
            if(err) return res.send({statu:500,mes:err.message,data:null})
            res.send({statu:200,mes:'ok',data:null})
        })
    }

}

module.exports = contr;