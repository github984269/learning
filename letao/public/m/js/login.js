$(function(){
    $("#login").on("tap",function() {
        var username = $("input[type=text]").val();
        var password = $("input[type=password]").val();
        console.log(username,password)
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                "username":username,
                "password":password
            },
            beforeSend:function() {
                $("#login").html("正在登陆...");
            },
            success:function(res) {
                if(res.success) {
                    mui.toast("登陆成功");
                setTimeout(function(){
                    location.href = "user.html";
                },2000)
                }
            }
        })
    })
})