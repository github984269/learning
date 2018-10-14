$(function() {
    var localArr = [];
    //从localStorage中取出数据
    
    if(JSON.parse(localStorage.getItem("searched"))) {
        localArr =  JSON.parse(localStorage.getItem("searched"));
        var html = template("mylist",{"result":localArr});
        $("#old").html(html);
    }
    

    $("#search-btn").click(function() {
        var keyword = $(this).prev().val();
        if(keyword) {
            //判断输入的关键字是否已经存在
        //     var isok = false;
        //     for (var i=0; i < localArr.length; i ++) {
        //         if(localArr[i] == keyword) {
        //             isok = true;
        //             break;
        //         }
        //     }
        //    if(!isok) {
        //     localArr.push(keyword);
        //    }

        if(localArr.indexOf(keyword)==-1) {
            localArr.push(keyword);
        }

            //把数组放到本地的storage中
            localStorage.setItem("searched",JSON.stringify(localArr));
            //跳转到搜索结果页面
            location.href = "search-result.html?keyword="+keyword;
        } else {
            alert("请输入商品名称");
        }
    })

    //点击清空历史
    $(".clear").click(function() {
        //清空localStorage中的数据
        localStorage.removeItem("searched");
        //清空ul
        $("#old").html('');
        //清空数组中的数据
        localArr = [];
    })
})