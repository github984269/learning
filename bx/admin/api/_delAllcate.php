<?php
    require "../../config.php";
    require "../../function.php";
    
    $ids = $_POST["ids"];

    $connect = connect();
    $sql = "DELETE FROM categories where id in (".implode(",", $ids).")";
    // echo $sql;
    $userData = mysqli_query($connect,$sql);
    // var_dump($userData);
    $response = ["code"=>0,"msg"=>"删除失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "删除成功";
    }

    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>