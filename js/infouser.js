$(document).ready(function () {
    //Muestra la tabla de informacion del usuario en la seccion mi perfil
    $.ajax({
        type: "GET",
        url: "php/userinfo.php",
        success: function (datos) {
                $("si").appendTo("#campo");
                var usuarios = jQuery.parseJSON(datos);
                for (var x of usuarios) {
                    
                    $("<div class='col-sm-6'><div class='panel panel-primary'><div class='panel-heading'>Editar perfil</div><div class='panel-body'><img src='img/user.png' class='img-responsive' style='width:100%' alt='Image'></div><div class='panel-footer'>Nombre: "+x.nombre+"</div><div class='panel-footer'>Apellidos: "+x.apellidos+"</div><div class='panel-footer'>Usuario: "+x.usuario+"</div><div class='panel-footer'>Email: "+x.email+"</div><div class='panel-footer'><input id='editar' name='"+x.id+"' type='button' value='Editar'></div></div></div>").appendTo("#campo .container .row");
                    console.log(x.usuario);

                }

                
        },
        error: function (xhr) {
            alert("Atencion: se ha producido un error");
            $("#mensaje1").append(xhr.statusText + xhr.responseText);
        },
    });

    
   
});