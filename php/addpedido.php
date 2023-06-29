<?php
include('Connection.php');
include('Crud.php');
session_start();
if (!is_null($_SESSION['user'])) {

    $nombre = $_SESSION['user'];
    $direccion = $_GET['address'];
    $ciudad = $_GET['city'];
    $codigo_postal = $_GET['zip'];

    $database = new Crud();
    $sqlConnection = new Connection();
    if (isset($nombre) && isset($direccion) && isset($ciudad) && isset($codigo_postal)) {
        if (!empty($nombre) && !empty($direccion) && !empty($ciudad) && !empty($codigo_postal)) {
            if (strlen($nombre) > 0 && strlen(trim($nombre)) == 0 || strlen($direccion) > 0 && strlen(trim($direccion)) == 0 || strlen($ciudad) > 0 && strlen(trim($ciudad)) == 0 || strlen($codigo_postal) > 0 && strlen(trim($codigo_postal)) == 0) {
            } else {
                $result = $database->getinfo("SELECT * FROM usuarios WHERE usuario = '$nombre'");
                $count = mysqli_num_rows($result);


                if ($count == 1) {
                    while ($row = $result->fetch_assoc()) {
                        $id = $row["id"];
                    }

                    $result = $database->getinfo("SELECT usuarios.id AS id_usuario, productos.id AS id_producto, productos.cantidad FROM usuarios JOIN cesta ON cesta.id_usuario = usuarios.id JOIN productos ON cesta.id_producto = productos.id WHERE usuarios.usuario = '$nombre'");
                    $count = mysqli_num_rows($result);
                    if ($count > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $id_prod = $row["id_producto"];

                            
                            $database->Stock($id_prod);
                            $database->addpedidocesta($id, $id_prod);
                        }

                        $result = $database->getinfo("SELECT * FROM usuario_producto WHERE id_usuario = '$id'");

                        while ($row = $result->fetch_assoc()) {
                            $id_cesta = $row['id'];
                            $data = array("preparando", $id, $direccion, $ciudad, $codigo_postal, $id_cesta);

                            $database->addpedido($data);
                        }


                        
                        $database->deletecesta($id);

                        echo "added";
                    }
                }
            }
        }
    } else {
        header("location: ../login.html");
    }
} else {
    header("location: ../login.html");
}
