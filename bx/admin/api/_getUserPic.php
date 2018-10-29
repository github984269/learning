<?php
    session_start();
    $userId = $_SESSION["userId"];
    require "../../config.php";
    require "../../function.php";

    $connect = connect();
    $sql = "SELECT * FROM users WHERE id = {$userId}";
    $userData = query($connect,$sql);
    // print_r($userData);
    $response = ["code"=>0,"msg"=>"登录失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "登录成功";
        // setcookie("isLogin","true",time()+PHP_INT_MAX,'/');
        $response["avatar"] = $userData[0]["avatar"];
        $response["nickname"] = $userData[0]["nickname"];
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>