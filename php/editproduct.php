<?php
include('Connection.php');
include('Crud.php');
session_start();

if (!is_null($_SESSION['user'])) {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $cantidad = $_POST['cantidad'];
    $id_genero = $_POST['genero'];

    $id = $_GET['id'];
    $imagened = $_POST['imagened'];



    if (isset($nombre) && isset($descripcion) && isset($precio) && isset($cantidad) && isset($id)) {
        if (!empty($nombre) && !empty($descripcion) && !empty($precio) && !empty($cantidad) && !empty($id)) {
            if(strlen($nombre) > 0 && strlen(trim($nombre)) == 0 || strlen($descripcion) > 0 && strlen(trim($descripcion)) == 0 || strlen($precio) > 0 && strlen(trim($precio)) == 0 || strlen($cantidad) > 0 && strlen(trim($cantidad)) == 0){
           
            }
            else{
                $database = new Crud();
                $sqlConnection = new Connection();
                if (0 < $_FILES['imagen']['error'][0]) {
                    echo 'Error: ' . $_FILES['imagen']['error'][0] . '<br>';
                } else {
            
                    if($_FILES['imagen']['name'][0] != ""){
                        move_uploaded_file($_FILES['imagen']['tmp_name'][0], '../productimg/' . $_FILES['imagen']['name'][0]);
                        $data = array($nombre, $descripcion, $precio, $cantidad, "productimg/" . $_FILES['imagen']['name'][0], $id_genero);
                
                        $database->editproduct($data, $id);
                        echo "1";
                    }
                    else{
                        $data = array($nombre, $descripcion, $precio, $cantidad, $imagened, $id_genero);
                
                        $database->editproduct($data, $id);
                        echo "1";
                    }
                    
                }
            }
            
           
        }
    } else {
        header("location: ../login.html");
    }
}
