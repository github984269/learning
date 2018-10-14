$(function(){
    //发送ajax获取数据
    var page = 1;
    var pageSize = 10;
    var picArr = [];

    //发送ajax获取产品数据
    $.ajax({
        type: "GET",
        url: "/product/queryProductDetailList",
        data: {
            "page":page,
            "pageSize":pageSize,
        },
        success:function(res) {
            var html = template("proDetailTpl",res);
            $("#product").html(html);
        }
    })


    //发送ajax获取添加中的二级分类下拉框
    $.ajax({
        type: "GET",
        url: "/category/querySecondCategoryPaging",
        data: {
            "page":1,
            "pageSize":100
        },
        success: function(res) {
            var str = '';
            $.each(res.rows,function(index,ele) {
                str += `<option value="${ele.id}">${ele.brandName}</option>`;
            })

            $("#select").html(str);
        }
    })

    //上传图片
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data.result.picAddr)
        }
    });

})