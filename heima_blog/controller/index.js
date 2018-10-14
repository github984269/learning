const coon = require("../db/index.js");

const contr = {
    shou: (req, res) => {
        var count = 0;
        const sql1 = "SELECT count(*) as count FROM blog_articles";
        coon.query(sql1, (err, result) => {
            if (err) count = 0;
            count = result[0].count;

            const pageSize = 3;
            const pagetotal = Math.ceil(count / pageSize);
            const nowpage = Number(req.query.page) || 1;

            const sql = `SELECT a.id,a.title,a.ctime,u.nickname FROM blog_articles a 
            LEFT JOIN blog_users u 
            ON a.authorid = u.id 
            order by id desc 
            limit ${(nowpage-1)*pageSize},${pageSize}`;
            coon.query(sql, (err, result) => {
                if (err) res.render("index.ejs", {
                    islogin: req.session.islogin,
                    user: req.session.user,
                    article: []
                });

                console.log(nowpage)
                res.render("index.ejs", {
                    islogin: req.session.islogin,
                    user: req.session.user,
                    article: result,
                    pagetotal: pagetotal,
                    nowpage:nowpage
                });
            })
        })


        //res.render方法只有配置了ejs才可以使用

    }
}

module.exports = contr;