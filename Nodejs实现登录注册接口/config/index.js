var sqlConfig = {
    host:"localhost",
    user:"root",
    password:"",
    database:"login_demo"
};

var urlConfig = {
    root:"/",   /* get，返回所有用户id和userName */
    login:"/login",     /* post，登录接口 */
    reg:"/reg",     /* post，注册接口 */
    update:"/update"    /* post，修改密码接口 */
};

module.exports = {
    sqlConfig,
    urlConfig
}