const coon = require("../db/index.js")

const moment = require("moment");

const marked = require("marked");

const contr1 = {
    article: (req, res) => {
        //如果用户没有登录，就跳转到登录页面
        if (!req.session.islogin) return res.redirect("/login");
        res.render("./article/add.ejs", {
            islogin: req.session.islogin,
            user: req.session.user
        })
    },
    addarticle: (req, res) => {
        let article = req.body;
        article.ctime = moment().format('MMMM-Do-YYYY h:mm:ss a');
        //session有过期时间，可能从服务器端获取不到
        // article.authorid = req.session.user.id;
        // res.send(article)
        const sql = "INSERT INTO blog_articles set ?";
        coon.query(sql, article, (err, result) => {
            if (err) return res.send({
                statu: 500,
                msg: err.message,
                data: null
            });
            // console.log(result)
            if (result.affectedRows != 1) {
                res.send({
                    statu: 500,
                    msg: "文章添加失败",
                    data: null
                });
            } else {
                res.send({
                    statu: 200,
                    msg: "文章添加成功",
                    data: result
                });
            }
        })
    },
    info: (req, res) => {
        // console.log(req.params);
        const id = req.params.id;
        //执行数据库的查询功能
        const sql = "select * from blog_articles where id= ?";
        coon.query(sql, id, (err, result) => {
            if (err) return res.send({
                statu: 500,
                msg: err.message
            });
            //跳转到首页出错？？？？？？？？？？？？？？
            if (result.length !== 1) return res.redirect("/");

            //将markdown文本转换为html文本
            const html = marked(result[0].content);
            //将转换后的html文本赋值给content
            result[0].content = html;
            // console.log(html)
            // console.log(result[0].content)
            res.render("./article/info.ejs", {
                islogin: req.session.islogin,
                user: req.session.user,
                article: result[0]
            });

        })
    },
    showedit: (req, res) => {
        const sql = "select * from blog_articles where id= ?";
        coon.query(sql, req.params.id, (err, result) => {
            if (err) return res.send({
                statu: 500,
                msg: err.message
            });
            // console.log(result)
            if (result.length != 1) return res.redirect("/");
            res.render("./article/edit.ejs", {
                islogin: req.session.islogin,
                user: req.session.user,
                article: result[0]
            });
        })

    },
    finishedit:(req,res) => {
        //如果用户没有的登录，不允许编辑
        if(!req.session.islogin) return res.redirect("/");
        const sql = "update blog_articles set ? where id = ?";
        coon.query(sql,[req.body,req.body.id],(err,result) => {
            if (err) return res.send({
                statu: 501,
                msg: err.message
            });
            if(result.affectedRows != 1) res.send({statu: 502,meg:"修改文章出错"})
            res.send( {statu: 200,meg:"成功修改文章"})
        })
    }
}
module.exports = contr1;