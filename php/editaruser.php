<?php
include('Connection.php');
include('Crud.php');
session_start();


if (!is_null($_SESSION['user'])) {
    
    $id = $_GET['id'];
    $nombre =  $_GET['name'];
    $apellidos = $_GET['cogname'];
    $user = $_GET['user'];
    $email = $_GET['email'];

    

    $password = md5($_GET['password']);
    if (isset($nombre) && isset($apellidos) && isset($user) && isset($email) && isset($password)) {
        if(strlen($nombre) > 0 && strlen(trim($nombre)) == 0 || strlen($apellidos) > 0 && strlen(trim($apellidos)) == 0 || strlen($user) > 0 && strlen(trim($user)) == 0 || strlen($email) > 0 && strlen(trim($email)) == 0 || strlen($password) > 0 && strlen(trim($password)) == 0){
           
        }
        else{
            $sqlConnection = new Connection();
            $sql = $sqlConnection->getConnection();
            $database = new Crud();
           
    
            $result = $database->getinfo("SELECT * FROM usuarios WHERE usuario = '$user'");
            $count = mysqli_num_rows($result);
            $data = array($nombre, $apellidos, $user, $email, $password);
            if($_SESSION['user'] == "Administrador"){
    
            }
            else{
                $_SESSION['user'] = $user;
            }
            
            $database->edituser($data, $id);
        }
        
    } else {
        header("location: ../login.html");
    }
}
