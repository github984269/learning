<?php
    require "../config.php";
    require "../function.php";
    $categoryId = $_POST["categoryId"];
    $currentPage = $_POST["currentPage"];
    $pageSize = $_POST["pageSize"];
    $offset = ($currentPage-1)*$pageSize;
    $connect = connect();
    $sql = "SELECT p.id,p.title,p.feature,p.created,p.content,p.views,p.likes,c.`name`,u.nickname,
    (SELECT COUNT(*) FROM comments where post_id = p.id) as userComments
    from posts p
    LEFT JOIN categories c on p.category_id = c.id
    LEFT JOIN users u on p.user_id = u.id
    WHERE p.category_id = {$categoryId}
    ORDER BY p.created DESC
    LIMIT {$offset},{$pageSize}";
    $postArr = query($connect,$sql);

    $response = ["code"=>0,"msg"=>"操作失败"];
    if ($postArr) {
        $response["code"] = 1;
        $response["msg"] = "查询成功";
        $response["data"] = $postArr;
    }
    header("content-type:application/json;charset=utf8");
    echo json_encode($response);
?>