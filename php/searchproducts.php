<?php 

include('Connection.php');
include('Crud.php');

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();
$filter1 = $_GET['producto'];

$result = $sqlData->getinfo("SELECT * FROM productos WHERE nombre LIKE '%$filter1%'");

$jsonData = array();

while ($row = $result->fetch_assoc()) {

    if($row['cantidad']!=0){
        $jsonData[] = $row;
    }
    
}

echo json_encode($jsonData);



?>