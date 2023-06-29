<?php
include('Connection.php');
include('Crud.php');

$sqlConnection = new Connection();
$sqlData = new crud();

$nombre =  $_GET['name'];
$apellidos = $_GET['cogname'];
$user = $_GET['user'];
$email = $_GET['email'];

$password = md5($_GET['password']);
$repeatpassword = md5($_GET['repeatpassword']);

if (isset($nombre) && isset($apellidos) && isset($user) && isset($email) && isset($password) && isset($repeatpassword)) {
    if (!empty($nombre) && !empty($apellidos) && !empty($user) && !empty($email) && !empty($password) && !empty($repeatpassword)) {
        if(strlen($nombre) > 0 && strlen(trim($nombre)) == 0 || strlen($apellidos) > 0 && strlen(trim($apellidos)) == 0 || strlen($user) > 0 && strlen(trim($user)) == 0 || strlen($email) > 0 && strlen(trim($email)) == 0 || strlen($password) > 0 && strlen(trim($password)) == 0){
           
        }
        else{
            $sql = $sqlConnection->getConnection();

            $result = $sqlData->getinfo("SELECT * FROM usuarios WHERE usuario = '$user'");
            $data = array($nombre, $apellidos, $user, $email, $password);
            $count = mysqli_num_rows($result);
    
            if ($count == 0) {
                if ($password == $repeatpassword) {
    
                    $sqlData->adduser($data);
                    echo "1";
                }
            }
        }
        
    }
} else {
    header("location: ../login.html");
}
