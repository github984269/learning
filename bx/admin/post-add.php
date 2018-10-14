<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Add new post &laquo; Admin</title>
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
        <h1>写文章</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <form id="data-form" class="row">
        <div class="col-md-9">
          <div class="form-group">
            <label for="title">标题</label>
            <input id="title" class="form-control input-lg" name="title" type="text" placeholder="文章标题">
          </div>
          <div class="form-group">
            <label for="content">标题</label>
            <textarea id="content" class="form-control input-lg" name="content" cols="30" rows="10" placeholder="内容"></textarea>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="slug">别名</label>
            <input id="slug" class="form-control" name="slug" type="text" placeholder="slug">
            <p class="help-block">https://zce.me/post/<strong>slug</strong></p>
          </div>
          <div class="form-group">
            <label for="feature">特色图像</label>
            <!-- show when image chose -->
            <img class="help-block thumbnail" style="display: none">
            <input id="feature" class="form-control" name="feature" type="file">
          </div>
          <div class="form-group">
            <label for="category">所属分类</label>
            <select id="category" class="form-control" name="category">
              <option value="1">未分类</option>
              <option value="2">潮生活</option>
            </select>
          </div>
          <div class="form-group">
            <label for="created">发布时间</label>
            <input id="created" class="form-control" name="created" type="datetime-local">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" class="form-control" name="status">
              <option value="drafted">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>
          <div class="form-group">
            <button id="btn-save" class="btn btn-primary" type="button">保存</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <?php
    $current_page = "post-add";
  ?>
  <?php include "public/_aside.php"; ?>

  <script src="../static/assets/vendors/jquery/jquery.js"></script>
  <script src="../static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script>NProgress.done()</script>
  <script src="../static/assets/vendors/ckeditor/ckeditor.js"></script>
  <script>
    $("#feature").on("change",function(){
      //原生的方法files
      var file = this.files[0];

      var formdata = new FormData();

      formdata.append("myfile",file);

      $.ajax({
        type: "post",
        url: "api/_uploadFile.php",
        data: formdata,
        contentType: false,
        processData: false,
        success: function(res) {
          if(res.code == 1) {
            $(".thumbnail").attr("src",res.src).show();
          }
        }

      })

    })

    //做富文本编辑器
    CKEDITOR.replace("content");

    //点击保存，把表单的数据发送到后台
    $("#btn-save").on("click",function() {

      //将富文本编辑器中的数据更新到文本域中
      CKEDITOR.instances.content.updateElement();

      var formData = $("#data-form").serialize();
      var src = $(".thumbnail").attr("src");
      var feature = src.slice(3,src.length);
      // console.log(formData+"&feature="+feature);
      

      $.ajax({
        type: "post",
        url: "api/_addPost.php",
        data: formData+"&feature="+feature,
        success: function(res) {
          if(res.code == 1) {
            console.log('上传成功');
          }
        }
      })

    })
  </script>
</body>
</html>
