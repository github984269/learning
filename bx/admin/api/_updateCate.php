<?php
    require "../../config.php";
    require "../../function.php";
    
    $name = $_POST["name"];
    $slug = $_POST["slug"];
    $classname = $_POST["classname"];
    $id = $_POST["id"];


    $connect = connect();
    $sql = "UPDATE categories SET 
    `name` = '{$name}',slug = '{$slug}', classname = '{classname}' 
    where id = {$id}";
    $userData = mysqli_query($connect,$sql);

    $response = ["code"=>0,"msg"=>"查询失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "查询成功";
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>