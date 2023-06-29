<?php
include('Connection.php');
include('Crud.php');

session_start();

$user = $_GET['user'];
$password = md5($_GET['password']) ;

if(isset($user) && isset($password)){
    if(!empty($user) && !empty($password)){
        $sqlConnection = new Connection();
        $sqlData = new crud();
        $sql = $sqlConnection->getConnection();
        
        $result = $sqlData->getinfo("SELECT * FROM usuarios");
        $count=mysqli_num_rows($result);
        
        while ($row = $result->fetch_assoc()) {
            if($user == $row["usuario"] && $password == $row["password"]){
                $_SESSION['user'] = $user;
                echo "1";
                
            }
            
        }
    }
}
else{
    header("location: ../login.html");
}







?>