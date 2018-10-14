//导入moment
const moment = require("moment");

//引入连接数据库的模块
const coon = require("../db/index.js");

const contr = {
   getlogin: (req,res) => {
    //res.render方法只有配置了ejs才可以使用
    //res.render中的文件路径是相对于app.set('view',路径)来查找
    res.render("user/login.ejs",{});
},
   getregister:(req,res) => {
    //res.render方法只有配置了ejs才可以使用
    //res.render中的文件路径是相对于app.set('view',路径)来查找
    res.render("user/register.ejs",{});
},
    postregister:(req,res) => {
        const user = req.body;
    
        //判断用户名是否为空
        if(user.username.trim() == '' || user.password.trim() == '' || user.nickname.trim() == '') {
            return res.send({status:200,mes:'用户信息不能为空'});
        }
    
        //判断用户名是否已经存在
        const sql1 = "select count(*)  as count from blog_users where username = ?";
        coon.query(sql1,user.username,(err,result) => {
            if(err) return res.send({status:500,mes:'查询数据库失败'});
            if(result[0].count !== 0) return res.send({status:501,mes:'用户名已存在'});
    
            //如果不存在就进行注册
            user.ctime = moment().format('MMMM-Do-YYYY h:mm:ss a');
            const sql = "insert into blog_users set ?"
            // res.send({status:200,mes:'ok'});
            coon.query(sql,user,(err,result) => {
                if(err) return res.send({status:505,mes:'数据库操作错误'});
                if(result.affectedRows !== 1)  return res.send({status:506,mes:'数据添加错误'});
                res.send({status:200,mes:'数据添加成功'});
            })
        })
    
        
    },
    postlogin: (req,res) => {
        const body = req.body;
        const sql = "SELECT * FROM blog_users WHERE username = ? AND `password` = ?";
        coon.query(sql,[body.username,body.password],(err,result) => {
            if(err) return res.send({status:500,mes:'数据库操作错误'});
            // console.log(result)
            //如果查询出来的条数不为1，说明错误
            if(result.length != 1) { 
                return res.send({status:501,mes:'用户名或密码不正确'});
            } else {
                //设置req.session为用户的登录状态
                req.session.islogin = true;
                //设置req.session为用户名
                req.session.user = result[0];
                res.send({status:200,mes:'登录成功'})

            }
            
        })
    },
    loginout:(req,res) => {
        //注销用户信息
        req.session.destroy(function(err){
            if(err) throw err;
            console.log("用户退出成功");
            res.redirect("/");
        })
    }

}

module.exports = contr;