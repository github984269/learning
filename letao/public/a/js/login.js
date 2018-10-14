$(function() {
    $("#login-btn").on("click",function() {
        var username = $.trim($("input[name=username]").val());
        var password = $.trim($("input[name=password]").val());
        if(!username) {
            alert("用户名不能为空");
        }
        if(!password) {
            alert("密码不能为空");
        }

        $.ajax({
            type: "POST",
            url: "/employee/employeeLogin",
            data : {
                "username": username,
                "password":password
            },
            success: function(res) {
               if(res.success) {
                   location.href = "user.html";
               } else {
                   alert(res.message);
               }
            }
        })
    })
})