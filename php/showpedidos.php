<?php 

include('Connection.php');
include('Crud.php');

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();

//$result = $sqlData->getinfo("SELECT pedidos.*, usuarios.usuario FROM pedidos JOIN usuarios ON pedidos.id_usuario = usuarios.id");
$result = $sqlData->getinfo("SELECT pedidos.*, usuarios.usuario, productos.nombre FROM pedidos JOIN usuarios ON pedidos.id_usuario = usuarios.id JOIN usuario_producto ON pedidos.id_cesta = usuario_producto.id JOIN productos ON usuario_producto.id_producto = productos.id");

$jsonData = array();

while ($row = $result->fetch_assoc()) {

    $jsonData[] = $row;
}

echo json_encode($jsonData);

?>