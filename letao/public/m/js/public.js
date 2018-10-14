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
$(function() {
    $("body").on("tap","a",function() {
        mui.openWindow({
            url:$(this).attr("href"),
        })
    })
    
    //获取地址栏中参数的函数
    
})