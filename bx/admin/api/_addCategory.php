<?php
    require "../../config.php";
    require "../../function.php";

    $name = $_POST["name"];
    $slug = $_POST["slug"];
    $classname = $_POST["classname"];

    $connect = connect();
    $sql = "SELECT * FROM categories 
    WHERE name = '{$name}'";
    $userData = query($connect,$sql);

    $keyArr = array_keys($_POST);
    $valueArr = array_values($_POST);

    // print_r($userData);
    $response = ["code"=>0,"msg"=>"操作失败"];
    if ($userData) {
        $response["msg"] = "分类名称已经存在，请重新输入";
    } else {
        

        $addConnect = connect();
        if(!$addConnect) {
            die("连接错误");
        }
        // $addSql = "INSERT INTO categories 
        // VALUES(null,'{$slug}','{$name}','{$classname}');";

         $addSql = "INSERT INTO categories(".implode(",",$keyArr).") 
        VALUES('".implode("','",$valueArr)."');";

        $AddData = mysqli_query($addConnect,$addSql);
        
        if($AddData) {
            $response["code"] = 1;
            $response["msg"] = "添加成功";
            $response["id"] = mysqli_insert_id($addConnect);
        }

        

    }

    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>