<?php
include('Connection.php');
include('Crud.php');
session_start();

$sqlConnection = new Connection();
$sqlData = new crud();


$id = $_GET['id'];

if(!is_null($_SESSION['user'])){
    if (isset($id)) {
        if (!empty($id)) {
            $sql = $sqlConnection->getConnection();
    
            $result = $sqlData->getinfo("SELECT pedidos.*, usuarios.usuario FROM pedidos JOIN usuarios ON pedidos.id_usuario = usuarios.id WHERE pedidos.id='$id'");
    
            $jsonData = array();
    
            while ($row = $result->fetch_assoc()) {
    
                $jsonData[] = $row;
            }
    
            echo json_encode($jsonData);
        } 
    }
    else {
        header("location: ../login.html");
    }
}