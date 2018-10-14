//不等页面加载，先发送ajax判断用户是否登陆
var userifo = '';
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    //将ajax的异步改成同步，就会等ajax 发送完之后再加载页面
    async: false,
    success: function(res) {
        if(res.error && res.error == 400) {
            location.href="login.html";
        }
        //发送成功后吧用户结果拿到
        userifo = res;
        // console.log(userifo)
    }
})
$(function() {
    $(".loginOut").on("tap",function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success:function(res) {
                if(res.success) {
                    mui.toast("退出登陆成功");
                    setTimeout(function() {
                        location.href="index.html";
                    },2000)
                }
            }
        })
    })

    
    var html = template("userTpl",userifo);
    $("#infomation").html(html);
})