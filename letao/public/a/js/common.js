//页面一打开就先判断是否登录
$.ajax ({
	type: "get",
	url: "/employee/checkRootLogin",
	//发送完ajax，检验用户登录后才加载页面，所以要异步
	async:false,
	success : function(res) {
		if(res.error &&　res.error==400) {
			location.href = "login.html";
		}
	}
})

$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});


	//点击退出，跳转到登录页面
	$(".login_out_bot").on("click",function() {
		
		if(confirm("确定要退出吗？")) {
			$.ajax({
				type: "GET",
				url: "/employee/employeeLogout",
				success: function(res) {
					console.log(res)
					if(res.success) {
						location.href = "login.html";
					} else {
						alert(res.message);
					}
				}

			})
		} 


	})

});