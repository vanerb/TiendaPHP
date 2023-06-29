<?php
include('Connection.php');
include('Crud.php');

session_start();

if (!is_null($_SESSION['user'])) {
    $id = $_GET['id'];
    if (isset($id)) {
        if (!empty($id)) {
            $database = new Crud();
            $sqlConnection = new Connection();
            $result = $database->getinfo("SELECT * FROM pedidos WHERE id = $id");

            while ($row = $result->fetch_assoc()) {
                $id_usuario = $row['id_usuario'];
            }

            $result = $database->getinfo("SELECT * FROM pedidos JOIN usuario_producto ON pedidos.id_cesta = usuario_producto.id WHERE pedidos.id='$id'");
            while ($row = $result->fetch_assoc()) {
                $id_prod = $row["id_producto"];

                $id_cesta = $row['id'];
                $database->DevolverProducto($id_prod);

                
            }

            $database->deletepedido($id);

            $database->deletepedidocesta($id_cesta);
        }
    } else {
        header("location: ../login.html");
    }
}
