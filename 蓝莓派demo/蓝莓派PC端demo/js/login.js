/* 判断之前是否登陆过 */
if (localStorage.getItem("username")) {
    $(".right .login").addClass("hidden");
    $("#username").text(localStorage.getItem("username"));
    $(".right .user").removeClass("hidden");
}

/* 切换tap */
function changeTap(onTap,offTap) {
    $("#login input").val("");
    $(`.${onTap}-tap`).addClass("selected-tap");
    $(`.${offTap}-tap`).removeClass("selected-tap");
    $(`.${onTap}-cont`).removeClass("hidden");
    $(`.${offTap}-cont`).addClass("hidden");
    $(`#${onTap}-name`).focus();
}
/* 关闭登录注册弹窗 */
function closeLogin() {
    $("#login input").val("");
    $(".login-bg").addClass("hidden");
}
/* 自动关闭的提示弹窗 */
function tips(text,time) {
    $("#tips span").text(text);
    $("#tips").removeClass("hidden");
    setTimeout(() => {
        $("#tips").addClass("hidden");
        $("#tips span").text("提示内容...");
    }, time);
}

/* 点击header的登录按钮 */
$(".goLogin").click(() => {
    $(".login-bg").removeClass("hidden");
    changeTap("login","reg");
});
/* 点击header的注册按钮 */
$(".goReg").click(() => {
    $(".login-bg").removeClass("hidden");
    changeTap("reg","login");
});
/* 点击登录tap */
$(".login-tap").click(() => {
    changeTap("login", "reg");
});
/* 点击注册tap */
$(".reg-tap").click(() => {
    changeTap("reg", "login");
});
/* 点击弹窗右上角的关闭按钮 */
$(".close-btn").click(() => {
    closeLogin();
});
/* 点击弹窗外部的蒙版区域关闭弹窗 */
$(".login-bg").click((e) => {
    if (e.target.className == "login-bg") {
        closeLogin();
    }
});
/* 点击登录按钮 */
$(".login-cont .btn").click(() => {
    var name = $("#login-name").val().trim();
    var pwd = $("#login-pwd").val();
    if (name && pwd) {
        $.post("http://localhost:3000/login",{
            name:name,
            pwd:pwd
        },(data) => {
            if (data.code == 1) {
                /* 登录成功 */
                closeLogin();
                tips("登录成功！正在为您跳转……",1000);
                $(".right .login").addClass("hidden");
                $("#username").text(name);
                $(".right .user").removeClass("hidden");
                localStorage.setItem("username",name);
            }else{
                /* 登录失败 */
                alert(data.msg||data);
                $("#login-pwd").val("");
                $("#login-pwd").focus();
            }
        });
    }else{
        if (!name) {
            /* 用户名为空 */
            alert("用户名不能为空，请输入后再登录。");
            $("#login-name").focus();
        }else{
            /* 密码为空 */
            alert("密码不能为空，请输入后再登录。");
            $("#login-pwd").focus();
        }
    }
})
/* 点击注册按钮 */
$(".reg-cont .btn").click(() => {
    var name = $("#reg-name").val();
    var pwd = $("#reg-pwd").val();
    var confirm = $("#reg-confirm").val();
    if (name && pwd && confirm) {
        if (pwd == confirm) {
            $.post("http://localhost:3000/reg",{
                name:name,
                pwd:pwd
            },(data) => {
                if (data.code == 1) {
                    /* 注册成功 */
                    closeLogin();
                    tips("注册成功！正在为您跳转登录……", 1000);
                    $(".right .login").addClass("hidden");
                    $("#username").text(name);
                    $(".right .user").removeClass("hidden");
                    localStorage.setItem("username", name);
                }else{
                    /* 注册失败 */
                    alert(data.msg||data);
                    $("#reg-pwd").val("");
                    $("#reg-confirm").val("");
                    $("#reg-name").focus();
                }
            })
        }else{
            alert("两次输入的密码不相同，请重新输入。");
            $("#reg-pwd").val("");
            $("#reg-confirm").val("");
            $("#reg-pwd").focus();
        }
    }else{
        if (!name) {
            alert("用户名不能为空，请输入后重试。");
            $("#reg-name").focus();
        }else if (!pwd) {
            alert("密码不能为空，请输入后重试。");
            $("#reg-pwd").focus();
        }else {
            alert("确认密码不能为空，请输入后重试。");
            $("#reg-confirm").focus();
        }
    }
})
/* 点击退出登录按钮 */
$(".logout").click(() => {
    $(".right .user").addClass("hidden");
    $("#username").text("admin");
    $(".right .login").removeClass("hidden");
    localStorage.removeItem("username");
})