$(function() {
    //发送ajax获取验证码
    $(".getCode").on("tap",function() {
        
        if(!$(".wrong").hasClass("gave")) {
            $.ajax({
                type: "get",
                url: "/user/vCode",
                success: function(res) {
                    if(res != '') {
                     $("input[name=vCode]").val(res.vCode);
                     $(".wrong").addClass("gave");
                     var time = 6;
                     $(".getCode").html(time+"秒后获取验证码").css("color","gray");
                     var timeId = setInterval(function() {
                         time --;
                         $(".getCode").html(time+"秒后获取验证码").css("color","gray");
                         if(time <= 0) {
                            $(".wrong").removeClass("gave");
                            $(".getCode").html("获取验证码").css("color","");;
                            clearInterval(timeId);
                         }
                     },1000)
                    }
                }        
             })
        }      
    })

    $(".reg").on("tap",function() {
        var username = $("input[name='username']").val();
        var mobile = $("input[name='mobile']").val();
        var password = $("input[name='password']").val();
        var againPass = $("input[name='againPass']").val();
        var vCode = $("input[name='vCode']").val();
        // console.log(username,mobile,password,againPass,vCode)
        if(password !== againPass) {
            $(".wrong").html("两次密码不一致");
            return;
        } else {
            $(".wrong").html("");
        }
        var reg = /^\d{11}$/;

        if(!username) {
            $(".wrong").html("用户名不能为空");
            return;
        }else if(!reg.test(mobile)) {
            $(".wrong").html("手机号不能为空");
            return;
        }else if(!password) {
            $(".wrong").html("密码不能为空");
            return;
        }else if(!againPass) {
            $(".wrong").html("请确认密码");
            return;
        }else if(!vCode) {
            $(".wrong").html("验证码不能为空");
            return;
        } else {
            $(".wrong").html("");
        }

        //发送ajax提交数据
        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                "username":username,
                "password":password,
                "mobile":mobile,
                "vCode":vCode
            },
            success: function(res) {
                // console.log(res)
                if(res.success) {
                    mui.alert("注册成功");
                    setTimeout(function() {
                        location.href= "login.html";
                    },2000)
                } else {
                    mui.alert(res.message);
                }
            }
        })
    })
})