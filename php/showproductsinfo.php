<?php 


include('Connection.php');
include('Crud.php');

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();

$result = $sqlData->getinfo("SELECT productos.*, genero.genero FROM productos JOIN genero ON productos.id_genero = genero.id");

$jsonData = array();

while ($row = $result->fetch_assoc()) {

    
    $jsonData[] = $row;
    
    
}

echo json_encode($jsonData);

?>