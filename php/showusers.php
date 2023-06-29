<?php 

include('Connection.php');
include('Crud.php');

session_start();

if(!is_null($_SESSION['user'])){
    if($_SESSION['user'] == "Administrador"){
        $sqlConnection = new Connection();
        $sqlData = new crud();
        $sql = $sqlConnection->getConnection();
        
        $result = $sqlData->getinfo("SELECT * FROM usuarios");
        
        $jsonData = array();
        
        while ($row = $result->fetch_assoc()) {
        
            $jsonData[] = $row;
        }
        
        echo json_encode($jsonData);
    }
    else{
        header("location: ../login.html");
    }
    
}
else{
    header("location: ../login.html");
}







?>