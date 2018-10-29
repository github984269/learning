<?php
    function connect() {
        return mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_NAME);
    }
    
    function query($connect,$sql) {
        $result = mysqli_query($connect,$sql);
        $arr=[];
        while($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
        return $arr;
    }

    function isLogin() {
        session_start();
        if(!isset($_SESSION["isLogin"]) || $_SESSION["isLogin"] != "true") {
          header("refresh:2;url=login.php");
        }
    }
?>