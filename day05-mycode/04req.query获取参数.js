const express = require('express');
//引入body-parser
const bodyParser = require('body-parser');

const app = express();
//解析表单数据就引入这个
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/formData',(req,res) => {
    res.send(req.body);
    // console.log(req.query)
})

// app.get('/user',(req,res) => {
//     res.send(req.query);
//     // console.log(req.query)
// })

// app.get('/user/:id/:name',(req,res) => {
//     res.send(req.params);
//     // console.log(req.query)
// })



app.listen(3000,() => {
    console.log('server is opened');
})