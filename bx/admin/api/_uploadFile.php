<?php
    $myfile = $_FILES["myfile"];

    $end = strchr($myfile["name"],".");
    $fileName = time().rand().$end;

    $result =  move_uploaded_file($myfile["tmp_name"],"../../static/uploads/".$fileName);

    $response = ["code"=>0,"msg"=>"上传失败"];
    if ($result) {
        $response["code"] = 1;
        $response["msg"] = "上传成功";
        $response["src"] = "../static/uploads/".$fileName; //要写前端对应的路径
    }
    header("content-type:application/json,charset=utf8");
    echo json_encode($response);

?>