<?php 



include('Connection.php');
include('Crud.php');
session_start();

if(!is_null($_SESSION['user'])){
    $user = $_SESSION['user'];

    $sqlConnection = new Connection();
    $sqlData = new crud();
    $sql = $sqlConnection->getConnection();
    
    
    $result = $sqlData->getinfo("SELECT productos.nombre, productos.precio, usuarios.usuario, cesta.id_producto, cesta.id_usuario FROM cesta JOIN usuarios ON cesta.id_usuario = usuarios.id JOIN productos ON cesta.id_producto = productos.id WHERE usuarios.usuario ='$user'");
    
    $jsonData = array();
    
    while ($row = $result->fetch_assoc()) {
    
        $jsonData[] = $row;
    }
    
    echo json_encode($jsonData);

}
else{
    header("location: ../login.html");
}




?>