<?php
    require "../../config.php";
    require "../../function.php";

    $currentPage = $_POST["currentPage"];
    $pageSize = $_POST["pageSize"];
    $offset = ($currentPage - 1) * $pageSize;

    $connect = connect();
    $sql = "SELECT c.author,c.content,p.title,c.created,c.`status` 
    FROM comments c
    LEFT JOIN posts p on c.post_id = p.id
    LIMIT {$offset},{$pageSize}";
    $userData = query($connect,$sql);
    
    //获取总页数
    $countSql = "SELECT COUNT(*) count FROM comments";
    $countArr = query($connect,$countSql);
    //得到的是一个二维数组
    $countPage = $countArr[0]["count"]/$pageSize;

    $response = ["code"=>0,"msg"=>"登录失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "登录成功";
        $response["data"] = $userData;
        $response["countPage"] = $countPage;
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>