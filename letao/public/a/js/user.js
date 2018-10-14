$(function() {
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            "page": 1,
            "pageSize": 10
        },
        success: function(res) {
            console.log(res);

            var html = template("userTpl",res);
            $('tbody').html(html);
        }
    })


    //点击禁止改变
    $("tbody").on("click",".changeDel",function() {
        var isDelete = $(this).attr("data-delete");
        var id = $(this).attr("data-id");
        $.ajax({
            type: "POST",
            url: "/user/updateUser",
            data: {
                "isDelete": isDelete == 1? 0 : 1,
                "id":id
            },
            success: function(res) {
                if(res.success) {
                    location.reload();
                }
            }
        })
    })
    

})