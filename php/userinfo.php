<?php 

include('Connection.php');
include('Crud.php');
session_start();

if(!is_null($_SESSION['user'])){
    $sqlConnection = new Connection();
    $sqlData = new crud();
    $sql = $sqlConnection->getConnection();
    $usuario = $_SESSION['user'];
    
    
    $result = $sqlData->getinfo("SELECT * FROM usuarios WHERE usuario='$usuario'");
    
    $jsonData = array();
    
    while ($row = $result->fetch_assoc()) {
    
        $jsonData[] = $row;
    }
    
    echo json_encode($jsonData);
}
else{
    header("location: ../login.html");
}




?>