$(document).ready(function () {
    //Muestra los usuarios
    $.ajax({
        type: "GET",
        url: "php/showusers.php",
        success: function (datos) {
                let users = new Array();
                var usuarios = jQuery.parseJSON(datos);
                for (var x of usuarios) {
                    users.push({
                        id:x.id,
                        name:x.nombre,
                        apellido:x.apellidos,
                        usuario: x.usuario,
                        email: x.email,
                        
                        

                    });
                }

                for(let i = 0;i<users.length;i++){

                    if(users[i].usuario != "Administrador"){
                        $("<tr><td>"+users[i].id+"</td><td>"+users[i].name+"</td><td>"+users[i].apellido+"</td><td>"+users[i].usuario+"</td><td>"+users[i].email+"</td><td><input id='editar' name='"+users[i].id+"' type='button' value='Editar'></td><td><input id='eliminar' name='"+users[i].id+"' type='button' value='Eliminar'></td></tr>").appendTo("#container table");

                    }
                }
        },
        error: function (xhr) {
            alert("Atencion: se ha producido un error");
            $("#mensaje1").append(xhr.statusText + xhr.responseText);
        },
    });

    
   
});