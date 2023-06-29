<?php
include('Connection.php');
include('Crud.php');

session_start();

if (!is_null($_SESSION['user'])) {
    $cod = $_GET['codigo'];
    if(isset($cod)){
        if(!empty($cod)){
            $codigo = explode(",", $cod);
            $database = new Crud();
            $sqlConnection = new Connection();
        
            $database->deleteelementcesta($codigo[0], $codigo[1]);
        }
    }
    else{
        header("location: ../login.html");
    }
    

    
}
