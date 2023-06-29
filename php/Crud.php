<?php

class Crud
{
    public function getinfo($sql)
    {
        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        
        $result = $mySQL->query($sql);
        return $result;
    }

 
    public function adduser($data)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "INSERT INTO usuarios(nombre, apellidos, usuario, email, password) VALUES ('$data[0]','$data[1]', '$data[2]', '$data[3]', '$data[4]')";

        $mysql->query($sql);
    }

    public function edituser($data, $id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "UPDATE usuarios SET nombre='$data[0]', apellidos='$data[1]', usuario='$data[2]', email='$data[3]', password='$data[4]' WHERE id='$id'";

        $mysql->query($sql);
    }
    public function deleteuser($id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "DELETE FROM usuarios WHERE id='$id'";

        $mysql->query($sql);
    }

    public function addproduct($data)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "INSERT INTO productos(nombre, descripcion, precio, cantidad, imagen, id_genero) VALUES ('$data[0]','$data[1]', '$data[2]', '$data[3]', '$data[4]', '$data[5]')";

        $mysql->query($sql);
    }

    public function deleteproduct($id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "DELETE FROM productos WHERE id='$id'";

        $mysql->query($sql);

    }

    public function editproduct($data,$id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "UPDATE productos SET nombre='$data[0]', descripcion='$data[1]', precio='$data[2]', cantidad='$data[3]', imagen='$data[4]', id_genero='$data[5]' WHERE id='$id'";

        $mysql->query($sql);
    }

    

    public function addpedido($data)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "INSERT INTO pedidos(estado, id_usuario, direccion, ciudad, codigo_postal, id_cesta) VALUES ('$data[0]','$data[1]', '$data[2]', '$data[3]', '$data[4]', '$data[5]')";

        $mysql->query($sql);
    }

    public function addCesta($data)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "INSERT INTO cesta(id_usuario, id_producto) VALUES ('$data[0]','$data[1]')";

        $mysql->query($sql);
    }
    public function deleteelementcesta($id_user, $id_prod)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "DELETE FROM cesta WHERE id_usuario = $id_user AND id_producto=$id_prod";

        $mysql->query($sql);
    }

    public function editpedido($data, $id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "UPDATE pedidos SET id_usuario = '$data[0]', estado='$data[1]', direccion='$data[2]', ciudad='$data[3]', codigo_postal='$data[4]', id_cesta='$data[5]' WHERE id='$id'";

        $mysql->query($sql);
    }

    public function deletepedido($id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "DELETE FROM pedidos WHERE id=$id";

        $mysql->query($sql);
    }

    public function deletecesta($id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "DELETE FROM cesta WHERE id_usuario = $id";

        $mysql->query($sql);
    }

    public function vaciarcesta()
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "DELETE FROM cesta";

        $mysql->query($sql);
    }

    public function Stock($id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "UPDATE productos SET cantidad=cantidad-1 WHERE id='$id'";

        $mysql->query($sql);
    }

    public function DevolverProducto($id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "UPDATE productos SET cantidad=cantidad+1 WHERE id='$id'";

        $mysql->query($sql);
    }

    public function addpedidocesta($id_usuario, $id_producto)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "INSERT INTO usuario_producto(id_usuario, id_producto) VALUES ('$id_usuario','$id_producto')";

        $mysql->query($sql);
    }

    public function editpedidocesta($id, $id_user)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "UPDATE usuario_producto SET id_usuario='$id_user' WHERE id_usuario='$id'";

        $mysql->query($sql);
    }

    public function deletepedidocesta($id)
    {
        $sqlConnection = new Connection();
        $mysql = $sqlConnection->getConnection();

        $sql = "DELETE FROM usuario_producto WHERE id = $id";

        $mysql->query($sql);
    }

}

?>