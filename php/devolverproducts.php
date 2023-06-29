<?php
include('Connection.php');
include('Crud.php');
session_start();
if (!is_null($_SESSION['user'])) {
    $nombre = $_SESSION['user'];
    $database = new Crud();
    $sqlConnection = new Connection();
    $id = $_GET['id'];

    $result = $database->getinfo("SELECT * FROM usuarios WHERE usuario = '$nombre'");
    $count = mysqli_num_rows($result);
    while ($row = $result->fetch_assoc()) {
        $id_usuario = $row['id'];
    }
    
    if ($count == 1) {
        $result = $database->getinfo("SELECT * FROM pedidos JOIN usuario_producto ON pedidos.id_cesta = usuario_producto.id WHERE pedidos.id='$id'");
        while ($row = $result->fetch_assoc()) {
            $id_prod = $row["id_producto"];
            $id_cesta = $row['id'];
            $database->DevolverProducto($id_prod);
        }

        $database->deletepedido($id);

        $database->deletepedidocesta($id_cesta);

        echo "PRODUCTO: ". $id_prod;
        echo "CESTA: ".$id_cesta;
        echo "ID_PEDIDO: ".$id;
        
        
    } else {
        header("location: ../login.html");
    }
} else {
    header("location: ../login.html");
}
