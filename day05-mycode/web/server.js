const express = require("express");
const app = express();

app.use(express.static(__dirname+"/semantic"));
app.use(express.static(__dirname+"/view"));
app.use(express.static("./node_modules"));

app.listen(3000,() => {
    console.log('server open');
})