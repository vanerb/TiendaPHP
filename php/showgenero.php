<?php



include('Connection.php');
include('Crud.php');

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();


$result = $sqlData->getinfo("SELECT * FROM genero");

$jsonData = array();

while ($row = $result->fetch_assoc()) {

    $jsonData[] = $row;
}

echo json_encode($jsonData);
