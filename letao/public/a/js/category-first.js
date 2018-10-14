$(function() {
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;

    //页面一上来就获取第一页的数据
    getData();

    //点击下一页，获取下一页的数据
    $(".next").on("click",function() {
        page ++;
        if(page >= totalPage) {
            page = totalPage;
            alert("已经是最后一页了！")
        }
        getData();
    })

    //点击上一页，获取数据
    $(".prev").on("click",function() {
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
            url: "/category/queryTopCategoryPaging",
            data: {
                "page":page,
                "pageSize":pageSize
            },
            success: function(res) {
                totalPage = Math.ceil(res.total/pageSize)
                var html = template("firstTpl",res);
                $(".firstBox").html(html);
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
    
})