<?php 

include('Connection.php');
include('Crud.php');

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();

$result = $sqlData->getinfo("SELECT * FROM productos");

$jsonData = array();

while ($row = $result->fetch_assoc()) {

    if($row['cantidad']!=0){
        $jsonData[] = $row;
    }
    
}

echo json_encode($jsonData);



?>