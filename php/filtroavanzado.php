<?php 

include('Connection.php');
include('Crud.php');

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();
$id = $_GET['id'];
$busqueda = $_GET['busqueda'];

$result = $sqlData->getinfo("SELECT * FROM productos WHERE id_genero = $id AND nombre LIKE '%$busqueda%'");

$jsonData = array();

while ($row = $result->fetch_assoc()) {

    if($row["cantidad"] > 0){
        $jsonData[] = $row;

    }
}

echo json_encode($jsonData);



?>