$(function () {
    var id = getDataUrl(location.href, 'id');
    var kuCunNum = 0;

    $.ajax({
        type: "GET",
        url: "/product/queryProductDetail",
        data: {
            "id": id,
        },
        success: function (res) {
            kuCunNum = res.num;
            var html = template("detailTpl", res);
            $(".pro-detail").html(html);

            // <!-- 初始化轮播图 -->
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
            });

            //初始换数量选择框
            mui(".mui-numbox").numbox();
        }
    })

    //点击尺码，让当前尺码选中
    $(".pro-detail").on("tap",".size span",function() {
        $(this).addClass("active").siblings().removeClass("active");
    })

    //选择件数后，剩余件数随之改变
    $(".pro-detail").on("change",".number",function() {
        var sheng = kuCunNum - $(this).val();
       $("#jian").html(sheng);
    })

    //点击加入购物车
    $(".pro-detail").on("tap","#addCar",function() {
       var num = $(".number").val();
       var size = $(".active").html();
       //发送ajax
       $.ajax({
           type: "POST",
           url: "/cart/addCart",
           data: {
                "productId":id,
                "num":num,
                "size":size
           },
           success: function(res) {
               if(res.success) {
                mui.confirm("是否去购物车查看？","温馨提示",function(msg) {
                    if(msg.index == 1) {
                        location.href = "cart.html";
                    }
                });
                   
               }
           }

       })


    })

})