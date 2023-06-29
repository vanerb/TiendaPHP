<?php

include('Connection.php');
include('Crud.php');
session_start();
$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();

$user = $_SESSION['user'];

$result = $sqlData->getinfo("SELECT pedidos.*, usuarios.usuario, productos.nombre FROM pedidos JOIN usuarios ON pedidos.id_usuario = usuarios.id JOIN usuario_producto ON pedidos.id_cesta = usuario_producto.id JOIN productos ON usuario_producto.id_producto = productos.id WHERE usuarios.usuario='$user'");
$jsonData = array();
while ($row = $result->fetch_assoc()) {
    $jsonData[] = $row;
}
echo json_encode($jsonData);
