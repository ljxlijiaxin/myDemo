var express = require("express");
var router = express.Router();
var urlConfig = require("../config").urlConfig;
var sqlFn = require("../sqlCont/crud");

/* 后台解决跨域 */
router.all('*', function (req, res, next) {
    /* 跨域处理 */
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    if(req.method.toLowerCase() == 'options'){
        res.send(200);  //让options尝试请求快速结束
    }else{
        next();
    }
})

/* 返回所有用户id和userName */
router.get(urlConfig.root,(req,res) => {
    var sql = "select * from userinfo";
    sqlFn(sql,[],(error) => {
        console.log(error);
        res.send("很抱歉，获取用户数据失败。");
    },(result) => {
        var userList = [];
        var userObj = {};
        result.forEach(e => {
            userObj = {
                id:e.id,
                name:e.userName
            };
            userList.push(userObj);
        });
        res.send(userList);
    });
});

/* 登录接口 */
router.post(urlConfig.login,(req,res) => {
    var userName = req.body.name;
    var password = req.body.pwd;
    var arr = [userName,password];
    var sql = "select * from userinfo where userName=? and password=?";
    sqlFn(sql,arr,(error)=>{
        console.log(error);
        res.send("网络开小差了，登录失败。请检查连接后重试。");
    },(result) => {
        if (result.length > 0) {
            res.send({
                code: 1,
                msg: "登录成功"
            });
        }else{
            res.send({
                code:0,
                msg:"用户名或密码错误，登录失败！"
            });
        }
    });
});

/* 注册接口 */
router.post(urlConfig.reg,(req,res) => {
    var userName = req.body.name;
    var password = req.body.pwd;
    var sql = "select * from userinfo";
    sqlFn(sql,[],(error) => {
        console.log(error);
        res.send("网络开小差了，注册失败。请检查连接后重试。");
    },(result) => {
        var tempArr = result.filter((obj) => {
            return obj.userName == userName;
        });
        if (tempArr.length > 0) {
            res.send("该用户名已存在，请重新输入。")
        }else{
            var arr = [userName, password];
            var insertSql = "insert into userinfo(userName,password) value(?,?)";
            sqlFn(insertSql,arr,(error) => {
                console.log(error);
                res.send("网络开小差了，注册失败。请检查连接后重试。");
            },(result) => {
                if (result.affectedRows > 0) {
                    res.send({
                        code: 1,
                        msg: "注册成功！"
                    });
                } else {
                    res.send({
                        code: 0,
                        msg: "注册失败！"
                    })
                }
            });
        }
    });
});

/* 修改密码接口 */
router.post(urlConfig.update,(req,res) => {
    var userName = req.body.name;
    var oldPwd = req.body.oldPwd;
    var newPwd = req.body.newPwd;
    var sql = "select * from userinfo where userName=? and password=?";
    var arr = [userName,oldPwd];
    sqlFn(sql,arr,(error) => {
        console.log(error);
        res.send("网络开小差了，修改失败。请检查连接后重试。");
    },(result) => {
        if (result.length > 0) {
            var updateArr = [newPwd,result[0].id];
            var updateSql = "update userinfo set password=? where id=?";
            sqlFn(updateSql,updateArr,(error) => {
                console.log(error);
                res.send({
                    code:0,
                    msg:"网络开小差了，修改失败。请检查连接后重试。"
                });
            },(result) => {
                if (result.affectedRows > 0) {
                    res.send({
                        code:1,
                        msg:"修改密码成功。"
                    });
                }else{
                    res.send({
                        code:0,
                        msg:"很抱歉，出错了，修改失败。"
                    });
                }
            });
        }else{
            res.send("用户名不存在或密码错误，修改失败。请查证后重试。");
        }
    });
});

module.exports = router;