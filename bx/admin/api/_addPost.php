<?php
    require "../../config.php";
    require "../../function.php";

    $title = $_POST["title"];
    $content = $_POST["content"];
    $slug = $_POST["slug"];
    $category = $_POST["category"];
    $created = $_POST["created"];
    $status = $_POST["status"];
    $feature = $_POST["feature"];

    // echo $feature;


    $connect = connect();
    $sql = "INSERT INTO posts(title,content,slug,category_id,created,status,feature) 
    VALUES('{$title}','{$content}','{$slug}','{$category}','{$created}','{$status}','{$feature}')";
    $userData = mysqli_query($connect,$sql);
    // print_r($userData);
    $response = ["code"=>0,"msg"=>"上传失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "上传成功";
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>