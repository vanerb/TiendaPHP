<?php 

include('Connection.php');
include('Crud.php');
session_start();

$sqlConnection = new Connection();
$sqlData = new crud();
$sql = $sqlConnection->getConnection();
$id = $_GET['id'];
$_SESSION['producto'] = $id;





?>