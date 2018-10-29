<?php
    require "../../config.php";
    require "../../function.php";

    $email = $_POST["email"];
    $password = $_POST["password"];

    $connect = connect();
    $sql = "SELECT * FROM users WHERE 
    email = '{$email}' and
     `password` = '{$password}' AND
      `status` = 'activated'";
    $userData = query($connect,$sql);

    $response = ["code"=>0,"msg"=>"登录失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "登录成功";
        // setcookie("isLogin","true",time()+PHP_INT_MAX,'/');
        session_start();
        $_SESSION["isLogin"] = "true";
        $_SESSION["userId"] = $userData[0]["id"];
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>