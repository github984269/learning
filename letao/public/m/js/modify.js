$(function() {
    //发送ajax获取验证码
    $(".getCode").on("tap",function() {
        
        if(!$(".wrong").hasClass("gave")) {
            $.ajax({
                type: "get",
                url: "/user/vCodeForUpdatePassword",
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


    $("#modify").on("tap",function() {
        var oldPass = $("input[name='oldPass']").val();
        var newPass = $("input[name='newPass']").val();
        var confirm = $("input[name='confirm']").val();
        var vCode = $("input[name='vCode']").val();
        // console.log(oldPass,newPass,confirm,vCode)
        if(oldPass == newPass) {
            $(".wrong").html("新密码不能和原来的密码一样");
            return;
        } else {
            $(".wrong").html("");
        }
        if(newPass !== confirm) {
            $(".wrong").html("两次密码不一致");
            return;
        } else {
            $(".wrong").html("");
        }

        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: {
               "oldPassword": oldPass,
               "newPassword": newPass,
               "vCode": vCode
            },
            success: function(res) {
                console.log(res)
                if(res.success) {
                    // console.log(1)
                    miu.toast("修改成功");
                    setTimeout(function() {
                        location.href="login.html";
                    },2000)
                }
            }
        })

    })
})