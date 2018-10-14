<?php
    require "../../config.php";
    require "../../function.php";

    $currentPage = $_POST["currentPage"];
    $pageSize = $_POST["pageSize"];
    $offset = ($currentPage - 1) * $pageSize;
    $status = $_POST["status"];
    $cateId = $_POST["cateId"];

    $where = " WHERE 1=1 ";  
    //*****前后必须有空格，否则插入到sql语句中就会和前后的语句连接起来

    if($status != 'all') {
        $where .= "AND p.status = '{$status}'";
    }

    if($cateId != 'all') {
        $where .= "AND c.id = '2'";
    }

    //WHERE p.`status`='{$status}' AND c.id={$cateId}

    $connect = connect();
    $sql = "SELECT p.id,p.title,p.created,p.`status`,u.nickname,c.`name` FROM posts p 
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.user_id = u.id
    {$where}
    LIMIT {$offset},{$pageSize}";
    $userData = query($connect,$sql);


$sqlCount = "SELECT COUNT(*) as count FROM posts p {$where}";

    $countArr = query($connect,$sqlCount);
    $pageCount = ceil($countArr[0]["count"] / $pageSize);

    // print_r($userData);
    $response = ["code"=>0,"msg"=>"操作失败"];
    if ($userData) {
        $response["code"] = 1;
        $response["msg"] = "操作成功";
        $response["data"] = $userData;
        $response["pageCount"] = $pageCount;
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);
?>