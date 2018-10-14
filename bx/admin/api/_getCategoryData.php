<?php
    require "../../config.php";
    require "../../function.php";

    $connect = connect();
    $sql = "SELECT * FROM categories";
    $userData = query($connect,$sql);
    // print_r($userData);
    $response = ["code"=>0,"msg"=>"登录失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "登录成功";
        // setcookie("isLogin","true",time()+PHP_INT_MAX,'/');
        $response["data"] = $userData;
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>