var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./router");

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use("/",router);

app.listen(3000,() => {
    console.log("服务器已启动，运行在3000端口上。")
});