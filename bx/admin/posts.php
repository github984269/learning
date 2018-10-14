<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Posts &laquo; Admin</title>
  <link rel="stylesheet" href="../static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../static/assets/vendors/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="../static/assets/vendors/nprogress/nprogress.css">
  <link rel="stylesheet" href="../static/assets/css/admin.css">
  <script src="../static/assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
  <script>NProgress.start()</script>

  <div class="main">
    
  <?php include "public/_navbar.php"; ?>

    <div class="container-fluid">
      <div class="page-title">
        <h1>所有文章</h1>
        <a href="post-add.php" class="btn btn-primary btn-xs">写文章</a>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <!-- show when multiple checked -->
        <a class="btn btn-danger btn-sm" href="javascript:;" style="display: none">批量删除</a>
        <form class="form-inline">
          <select id="category" name="" class="form-control input-sm">
            <option value="all">所有分类</option>
          </select>
          <select id="status" name="" class="form-control input-sm">
            <option value="all">所有状态</option>
            <option value="drafted">草稿</option>
            <option value="published">已发布</option>
            <option value="trashed">已作废</option>
          </select>
          <button id="btn-filt" type="button" class="btn btn-default btn-sm">筛选</button>
        </form>
        <ul class="pagination pagination-sm pull-right">
          <!-- <li><a href="#">上一页</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">下一页</a></li> -->
        </ul>
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">状态</th>
            <th class="text-center" width="100">操作</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>
    </div>
  </div>

  <?php
    $current_page = "posts";
  ?>
  <?php include "public/_aside.php"; ?>

  <script src="../static/assets/vendors/jquery/jquery.min.js"></script>
  <script src="../static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script>NProgress.done()</script>
  <script>
  //动态生成翻页
  var currentPage = 6;
  var pageCount = 10;
  var pageSize = 10;
 
 //生成页码结构的函数
 function makePageButton() {
  var start = currentPage - 2;
  // var end = currentPage + 2;

  if (start < 1) {
    start = 1;
  }
  
  var end = start + 4;

  if(end > pageCount) {
    end = pageCount;
  }
  var html = '';
  if(currentPage != 1) {
    html += `<li class="item" data-page="${currentPage-1}"><a href="#">上一页</a></li>`;
  }
  
  for (var i = start; i <= end; i ++) {
    if (i == currentPage) {
      html += `<li class="item active" data-page="${i}"><a href="#">${i}</a></li>`;
    } else {
      html += `<li class="item" data-page="${i}"><a href="#">${i}</a></li>`;
    }
  }
  if(currentPage != pageCount) {
    html += `<li class="item" data-page="${currentPage+1}"><a href="#">下一页</a></li>`;
  }
  
  $(".pagination").html(html);
 }

//生成列表内容的函数
 function makeTable(res) {
  var str = '';
  $.each(res.data,function(index,ele) {
            str+= `<tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>${ele.title}</td>
            <td>${ele.nickname}</td>
            <td>${ele.name}</td>
            <td class="text-center">${ele.created}</td>
            <td class="text-center">${statusData[ele.status]}</td>
            <td class="text-center">
              <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>`;
          })
     $("tbody").html(str);       
 }


  var statusData = {
    //状态（drafted-草稿/published-已发布/trashed-已作废）
    drafted: '草稿',
    published: '已发布',
    trashed: '已作废'
  }

  //生成第一次的数据
    $.ajax({
      type: "post",
      url: "api/_getPostData.php",
      data: {
        "currentPage":1,
        "pageSize":pageSize,
        "status": 'all',
        "cateId": 'all'
      },
      success: function(res) {

        if(res.code == 1) {
          //获取总页数
        pageCount = res.pageCount;
        makePageButton();

        makeTable(res);  
        }
        
      }
    })

  //点击页码，获取对应数据
  $(".pagination").on("click",".item",function() {

    currentPage = parseInt($(this).attr("data-page"));
    
    $.ajax({
      type: "post",
      url: "api/_getPostData.php",
      data: {
        "currentPage":currentPage,
        "pageSize":pageSize,
        "status": 'all',
        "cateId": 'all'
      },
      success: function(res) {

        if(res.code == 1) {
          //获取总页数
        pageCount = res.pageCount;
        makePageButton();

        makeTable(res); 
        }

      }
    })
  })

  //设置分类
  $.ajax({
    type: "post",
    url: "api/_getCategoryData.php",
    success: function(res) {
      if(res.code == 1) {
        $.each(res.data,function(index,ele) {
          var html = `<option value="${ele.id}">${ele.name}</option>`;
          $("#category").append($(html));
        })
      }
    }

  })

  //点击筛选
  $("#btn-filt").on("click",function() {
    //获取选择的status
    var status = $("#status").val();
    //获取所选分类的id
    var cateId = $("#category").val();
    
    $.ajax({
      type: "post",
      url: "api/_getPostData.php",
      data: {
        "status": status,
        "cateId": cateId,
        "currentPage":currentPage,
        "pageSize":pageSize
      },
      success: function(res) {
        
        if(res.code == 1) {
          //获取总页数
        pageCount = res.pageCount;
        makePageButton();

        makeTable(res); 
        }
      }
    })
  })
  </script>
</body>
</html>
