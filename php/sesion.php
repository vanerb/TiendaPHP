<?php

session_start();

    if (!is_null($_SESSION["user"]) && $_SESSION["user"] != "Administrador") {
        echo "1";
    }
    else if($_SESSION["user"] == "Administrador"){
        echo "2";
    }
    else {
        echo "200";
    }





