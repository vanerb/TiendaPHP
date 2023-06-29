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

            $sql = $sqlConnection->getConnection();

            $result = $database->getinfo("SELECT * FROM productos WHERE id='$id'");

            $nameuser = $_SESSION['user'];


            while ($row = $result->fetch_assoc()) {

                $imagen = $row['imagen'];
            }

            $result = $database->getinfo("SELECT * FROM usuario_producto JOIN productos ON usuario_producto.id_producto = productos.id WHERE productos.id = $id");
            $count = mysqli_num_rows($result);

            if ($count > 0) {

                echo "2";
            } else {
                unlink("../" . $imagen);
                $database->vaciarcesta();
                $database->deleteproduct($id);
                unset($_SESSION["producto"]);
                echo "1";
            }
        }
    } else {
        header("location: ../login.html");
    }
}
