<?php 

include('Connection.php');
include('Crud.php');
session_start();

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();

$idprod = $_SESSION['producto'];

$result = $sqlData->getinfo("SELECT * FROM productos WHERE id = $idprod");

$jsonData = array();

while ($row = $result->fetch_assoc()) {

    $jsonData[] = $row;
}

echo json_encode($jsonData);

?>