<?php
  require_once "config.php";
  require_once "function.php";
  $categoryId = $_GET["categoryId"];

  $connect = connect();
  $sql = "SELECT p.id,p.title,p.feature,p.created,p.content,p.views,p.likes,c.`name`,u.nickname,
  (SELECT COUNT(*) FROM comments where post_id = p.id) as userComments
  from posts p
  LEFT JOIN categories c on p.category_id = c.id
  LEFT JOIN users u on p.user_id = u.id
  WHERE p.category_id = {$categoryId}
  ORDER BY p.created DESC
  LIMIT 0,10";

  $postArr = query($connect,$sql);
  // print_r($postArr);
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>阿里百秀-发现生活，发现美!</title>
  <link rel="stylesheet" href="static/assets/css/style.css">
  <link rel="stylesheet" href="static/assets/vendors/font-awesome/css/font-awesome.css">
</head>
<body>
  <div class="wrapper">
    <div class="topnav">
      <ul>
        <li><a href="list.php"><i class="fa fa-glass"></i>奇趣事</a></li>
        <li><a href="list.php"><i class="fa fa-phone"></i>潮科技</a></li>
        <li><a href="list.php"><i class="fa fa-fire"></i>会生活</a></li>
        <li><a href="list.php"><i class="fa fa-gift"></i>美奇迹</a></li>
      </ul>
    </div>

  <?php 
   require "./public/_header.php";
   require "./public/_aside.php";
  ?>
    <div class="content">
      <div class="panel new">
        <h3><?php echo $postArr[0]["name"] ?></h3>
        <?php foreach($postArr as $value){ ?>
          <div class="entry">
          <div class="head">
            <a href="detail.php?postId=<?php echo $value["id"] ?>"><?php echo $value["title"] ?></a>
          </div>
          <div class="main">
            <p class="info"><?php echo $value["nickname"] ?> 发表于 <?php echo $value["created"] ?></p>
            <p class="brief"><?php echo $value["content"] ?></p>
            <p class="extra">
              <span class="reading">阅读(<?php echo $value["views"] ?>)</span>
              <span class="comment">评论(<?php echo $value["userComments"] ?>)</span>
              <a href="detail.php" class="like">
                <i class="fa fa-thumbs-up"></i>
                <span>赞(<?php echo $value["likes"] ?>)</span>
              </a>
              <a href="javascript:;" class="tags">
                分类：<span><?php echo $value["name"] ?></span>
              </a>
            </p>
            <a href="javascript:;" class="thumb">
              <img src="static/uploads/hots_2.jpg" alt="">
            </a>
          </div>
        </div>
          <?php } ?>
       
        <div class="loadmore">
          <span class="btn"> 加载更多</span>
      </div>
      </div>
    </div>
    <div class="footer">
      <p>© 2016 XIU主题演示 本站主题由 themebetter 提供</p>
    </div>
  </div>
  <script src="./static/assets/vendors/jquery/jquery.min.js"></script>
  <script>
    var categoryId = location.search.split("=")[1];
    var currentPage = 1;
    $(".loadmore .btn").on("click",function() {
      currentPage++;
      $.ajax({
      type: "post",
      url: "./api/moveMorePost.php",
      data: {
        "categoryId":categoryId,
        "currentPage":currentPage,
        "pageSize":10
      },
      success: function(res) {
        if (res.code == 1) {
          var str="";
         $.each(res.data,function(index,val){
           str += `<div class="entry">
          <div class="head">
            <a href="detail.php?postId=${val.id}">${val.title}</a>
          </div>
          <div class="main">
            <p class="info">${val.nickname}发表于${val.created}</p>
            <p class="brief">${val.content}</p>
            <p class="extra">
              <span class="reading">阅读(${val.views})</span>
              <span class="comment">评论(${val.userComments})</span>
              <a href="detail.php" class="like">
                <i class="fa fa-thumbs-up"></i>
                <span>赞(${val.likes})</span>
              </a>
              <a href="javascript:;" class="tags">
                分类：<span>${val.name}</span>
              </a>
            </p>
            <a href="javascript:;" class="thumb">
              <img src="static/uploads/hots_2.jpg" alt="">
            </a>
          </div>
        </div>`;
         })
        //  console.log($(str))
        // console.log(str)
         $(str).insertBefore(".loadmore");
        }
      }
    })
    })
    
  </script>
</body>
</html>