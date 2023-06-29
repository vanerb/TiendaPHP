<?php


include('Connection.php');
include('Crud.php');
session_start();

$sqlConnection = new Connection();
$sqlData = new crud();
$user = $_SESSION['user'];
$producto = $_GET['prod'];
if (!is_null($_SESSION['user'])) {
    if (isset($producto)) {
        if (!empty($producto)) {
            $sql = $sqlConnection->getConnection();
            $result = $sqlData->getinfo("SELECT * FROM usuarios WHERE usuario = '$user'");
            $count = mysqli_num_rows($result);

            if ($count == 1) {
                while ($row = $result->fetch_assoc()) {
                    $id = $row["id"];
                }
                $data = array($id, $producto);
                
                $sqlData->addCesta($data);
                echo "1";
            }
        }
    } else {
        header("location: ../login.html");
    }
}
