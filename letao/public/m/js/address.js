$(function() {
    var address = null;
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function(res) {
           address = res;
           var html = template("addressTpl",{"result":res})
            $("#address").html(html)
        }
    })

    //点击删除按钮
    $("#address").on("tap",".delete-btn",function() {
        var id = $(this).attr("data-id");
        var li = this.parentNode.parentNode;
        mui.confirm("确认要删除吗？",function(mes) {
            if(mes.index == 1) { //确认删除
                $.ajax({
                    type: "post",
                    url: "/address/deleteAddress",
                    data: {"id": id},
                    success: function(res) {
                        if(res.success) {
                            // location.href = "adress.html"; //重新刷新页面
                            $(li).remove(); //自杀
                        }
                    }
                })
            } else {
                //括号里面放一个原生的要划回去的标签
                mui.swipeoutClose(li);
            }
        })
    })

    //点击编辑按钮
    $("#address").on("tap",".edit-btn",function() {
        var id = $(this).attr("data-id");
        for (var i = 0; i < address.length; i ++) {
            if(address[i].id == id) {
                localStorage.setItem("editAddress",JSON.stringify(address[i]));
                break;
            }
        }
        location.href = "addAdress.html?edit=1";
    })

})
