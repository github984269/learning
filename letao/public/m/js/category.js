$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //获取一级列表
    $.ajax({
        type:"get",
        url: "/category/queryTopCategory",
        success: function(res) {
            var html = template("firstPage",{"result":res.rows});
            $(".link").html(html);

            //  //自动触发第一个
            $(".link").children("a").eq(0).trigger("click");

            //获取到一级列表后，默认显示第一个列表的二级页面;
            // if(res.rows.length) {
            //     $(".link").children("a").eq(0).addClass("active");
            //     var id = res.rows[0].id;
            //     getSecondPage(id);
            // }
        }
    })

    //发送ajax获取二级页面的函数
    function getSecondPage(id) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                "id":id
            },
            success:function(res) {
                // console.log(res);
                var html = template("secondPage",res);
                $(".brand-list").html(html);
            }
        })
    }

    //获取二级页面
    $(".link").on("click","a",function() {
        var id = $(this).attr("data-id");
        $(this).addClass("active").siblings().removeClass("active");

        getSecondPage(id);
    })

   
    
})