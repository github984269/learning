$(function() {

    //发送ajax获取英雄列表
    function getData() {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:5001/getAllHero",
            success:function(res) {
                // console.log(res)
                var html = template("showHero",res);
                $('tbody').html(html);
            }
        })
    
    }

    getData();

    //弹出框
    $("#add").on("click",function() {
        // console.log(11)
        $('.ui.modal').modal('show');
    })

    //取添加的数据
    $("#btnAdd").on("click",function() {
        // console.log($("#form").serialize());
        //发送ajax更新数据
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:5001/addHero",
            data: $("#form").serialize(),
            success: function(res) {
                // console.log(res)
                if(res.statu == 200) {
                    getData();
                }
            }
        })
    })

    //删除英雄信息
    $("tbody").on("click",".del",function() {
        var id = $(this).attr("data-id");
        $.ajax({
            type:"get",
            url: `http://127.0.0.1:5001/deletehero/${id}`,
            success: function(res) {
                // console.log(res)
                if(res.statu == 200) {
                    getData();
                }
            }
        })
    })

    //编辑英雄信息
    $("tbody").on("click",".edit",function() {
        $('.ui.modal.editHero').modal('show');
        var id = parseInt($(this).attr("data-id"));
        // console.log(typeof id)  number
        var name = $(this).parent().siblings().eq(1).html();
        var gender = $(this).parent().siblings().eq(2).html();
        var isdel = $(this).parent().siblings().eq(0).find("div").html()== '删除' ? '1':'0';
        
        $(".editHero input[name=name]").val(name);
        $(".editHero input[name=gender]").val(gender);
        $(".editHero input[name=isdel]").val(isdel);

        //点击确定发送ajax到后台
        $("#btnEdit").on("click",function() {
            $.ajax({
                type:"post",
                url: `http://127.0.0.1:5001/updatehero/${id}`,
                data: $("#edform").serialize(),
                success: function(res) {
                    console.log(res)
                    if(res.statu == 200) {
                        getData();
                    }
                }
            })
        })
        
    })
})