$(function() {
    var url = location.href;
    var keyword = getDataUrl(url,"keyword");
    var page = 1;
    var html = '';
    var priceSort = 1;
    var that = '';
   
    // console.log(keyword)
    //根据关键字，发送ajax,获取数据

     mui.init({
        pullRefresh : {
          container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback : ajaxGet //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });

      //点击价格排序
      $("#price").on("tap",function() {
          //将页码重置为1
          page = 1;
          //改变排序
          priceSort = priceSort == 1 ? 2 : 1;
          html = '';
          //从小开启上拉事件
          mui('#refreshContainer').pullRefresh().refresh(true);
          ajaxGet();
      })
    
    function getDataUrl(url,name) {
        var listArr = url.split("?")[1];
        
        var dataArr = listArr.split("&");
        for(var i = 0; i < dataArr.length; i ++) {
            var keyArr = dataArr[i].split("=");
            if (keyArr[0] == name) {
                return keyArr[1];
            }
        }
        return null;
    }

    function ajaxGet() {
        if(!that) {
            that = this;
        }
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data :{
               "page": page++,
               "pageSize":3,
               "proName":keyword,
               "price": priceSort
            },
            success: function(res) {
                if(res.data.length > 0) {
                    html += template("productList",res);
                    $(".list").html(html);
                    //加载完成后隐藏正在加载
                    that.endPullupToRefresh(false);
                } else {
                    that.endPullupToRefresh(true);
                }
               
            }
        })
    
    }

})