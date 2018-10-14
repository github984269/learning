$(function () {
    var edAddress = '';
    //获取地址栏中参数的函数
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

    //判断是编辑还是添加，调整页面结构
    var url = location.href;
    var edit = getDataUrl(url, 'edit');
    console.log(edit)
    if (edit == 1) {
        //获取loacalStorage中的值
        if (localStorage.getItem("editAddress")) {
            edAddress = JSON.parse(localStorage.getItem("editAddress"));

            var html = template("editTpl", edAddress);
            $(".edit").html(html);
        }
    } else {
        var html = template("editTpl", {});
        $(".edit").html(html);
    }
    

    //用miu的城市三级联动
    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);

    $("#selectCity").on("tap", function () {
        picker.show(function (selectItems) {
            $("#selectCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })

    $("#go").on("tap", function () {
        //$.trim jquery中去除前后空格的方法
        var recipients = $.trim($("input[name='recipients']").val());
        var postcode = $.trim($("input[name='postcode']").val());
        var address = $.trim($("input[name='address']").val());
        var addressDetail = $.trim($("input[name='addressDetail']").val());

        // console.log(recipients,postcode,address,addressDetail)
        if (!recipients) {
            $(".wrong").html("收货人不能为空");
            return;
        } else if (!postcode) {
            $(".wrong").html("邮政编码不能为空");
            return;
        } else if (!address) {
            $(".wrong").html("省市区不能为空");
            return;
        } else if (!addressDetail) {
            $(".wrong").html("详细地址不能为空");
            return;
        } else {
            $(".wrong").html("");
        }
        

        var url = "/address/addAddress";
        var data = {
            "address": address,
            "addressDetail": addressDetail,
            "recipients": recipients,
            "postcode": postcode
        };
        
        if(edit == 1) {
            url = "/address/updateAddress";
            data.id = edAddress.id;
        }

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (res) {
                if (res.success) {
                    location.href = "adress.html";
                }
            }
        })


    })

})