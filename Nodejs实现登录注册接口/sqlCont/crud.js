var client = require("./index");

function sqlFn(sql,arr,errFn,callback) {
    client.query(sql,arr,function (error,result) {
        if (error) {
            errFn(error);
        }else{
            callback(result);
        }
    });
}

module.exports = sqlFn;