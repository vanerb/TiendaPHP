<?php
include('Connection.php');
include('Crud.php');

session_start();
if (!is_null($_SESSION['user'])) {
    $id = $_GET['id'];
    if (isset($id)) {
        if (!empty($id)) {

            $sqlConnection = new Connection();
            $sqlData = new crud();
            $sql = $sqlConnection->getConnection();

            $result = $sqlData->getinfo("SELECT * FROM usuario_producto JOIN usuarios ON usuario_producto.id_usuario = usuarios.id WHERE usuario_producto.id_usuario = $id");
            $count = mysqli_num_rows($result);
            
            if ($count > 0) {
                echo "2";
            } 
            else {
                $sqlData->deleteuser($id);
                echo "1";
            }
           
        }
    } else {
        header("location: ../login.html");
    }
}
