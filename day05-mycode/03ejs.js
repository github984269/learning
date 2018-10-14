const express = require('express');

const app = express();
//配置默认的模板引擎
app.set('view engine','ejs');
//配置模板页面的存放路径
app.set('views','./ejs_pages');

app.get('/',(req,res) => {
    res.render('index',{name:"zs",age: 18,hobby: ['吃饭','睡觉','打豆豆']});
})

app.listen(3000,() => {
    console.log('server is opened');
})