$(function() {
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;

    //页面一上来就获取第一页的数据
    getData();

    //点击下一页，获取下一页的数据
    $("#nextBtn").on("click",function() {
        page ++;
        if(page > totalPage) {
            page = totalPage;
            alert("已经是最后一页了！")
        }
        getData();
    })

    //点击上一页，获取数据
    $("#prevBtn").on("click",function() {
        page --;
        if(page < 1) {
            page = 1;
            alert("已经是第一页了！");
        }
        getData();
    })

    //发送ajax 获取数据的函数
    function getData() {
        $.ajax({
            type: "GET",
            url: "/category/querySecondCategoryPaging",
            data: {
                "page":page,
                "pageSize":pageSize
            },
            success: function(res) {
                totalPage = Math.ceil(res.total/pageSize)
                var html = template("secondTpl",res);
                $(".secondBox").html(html);
            }
    
        })
    }

    //点击保存，增加分类数据
    $(".save").on("click",function() {
        var cateName = $.trim($("input[name=cateName]").val());
        // console.log(cateName)
        if(!cateName) {
            alert("分类名称不能为空");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/category/addTopCategory",
            data :{"categoryName": cateName},
            success: function(res) {
                if(res.success) {
                    location.reload();
                }
            }
        })
    })

    //发送ajax获取添加中的二级分类下拉框
    $.ajax({
        type: "GET",
        url: "/category/queryTopCategoryPaging",
        data: {
            "page":1,
            "pageSize":100
        },
        success: function(res) {
            var str = '';
            $.each(res.rows,function(index,ele) {
                str += `<option value="${ele.id}">${ele.categoryName}</option>`;
            })

            $("#select").html(str);
        }
    })

    //上传文件
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $("#img").attr("src",data.result.picAddr)
        }
    });

    //点击添加，发送ajax添加二级分类
    $("#addSecond").on("click",function() {
       var brandLogo = $("#img").attr("src");
       var categoryId = $("select[name=categoryId]").val();
       var brandName = $("input[name=brandName]").val();
    //    console.log(categoryId)

       $.ajax({
           type: "POST",
           url: "/category/addSecondCategory",
           data: {
               "brandLogo":brandLogo,
               "categoryId":categoryId,
               "brandName":brandName,
               "hot":0
           },
           success:function(res) {
               if(res.success) {
                   location.reload();
               }
           }
       })


    })
})