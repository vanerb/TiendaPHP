<?php
include('Connection.php');
include('Crud.php');
session_start();

if (!is_null($_SESSION['user'])) {

    
    $id = $_GET['id'];
    $usuario = $_GET['usuario'];
    $estado = $_GET['selectpedido'];
    $direccion = $_GET['direccion'];
    $ciudad = $_GET['ciudad'];
    $codigo_postal = $_GET['codigo'];
    $id_cesta = $_GET['idcesta1'];
    $sqlConnection = new Connection();
    $database = new Crud();
    $data = array($usuario, $estado, $direccion, $ciudad, $codigo_postal, $id_cesta);

    $database->editpedido($data, $id);

    echo $usuario. $estado.$direccion.$ciudad. $codigo_postal.$id_cesta;
    if (isset($id) && isset($usuario) && isset($estado) && isset($direccion) && isset($ciudad) && isset($codigo_postal)) {
        


        if (strlen($direccion) > 0 && strlen(trim($direccion)) == 0 || strlen($ciudad) > 0 && strlen(trim($ciudad)) == 0 || strlen($codigo_postal) > 0 && strlen(trim($codigo_postal)) == 0) {
        } else {


           

        }
    }
}
