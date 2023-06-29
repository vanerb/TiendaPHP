<?php 
class Connection{
    private $server = "localhost";
    private $user = "tu_usuario_bbdd";
    private $password = "tu_contrasena_bbdd";
    private $db = "tu_base_de_datos_bbdd";

    public function getConnection(){
        return $conexion = new mysqli(
            $this->server,
            $this->user,
            $this->password,
            $this->db);
    }



    
}

?>
