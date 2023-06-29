$(document).ready(function () {
    //LLama a la funcion para actualizar
    actualizar();
    var cod;
    //Boton de editar que rellena los campos
    $("body").on("click", "#editar", function () {

        cod = $(this).parents("#campo .container .panel-footer").find('input[type="button"]').attr('name');
        console.log(cod);

        $("div#editarform").css({ "display": "block" });
        $.ajax({
            type: "GET",
            url: "php/buscar.php?id=" + cod,
            success: function (datos) {
                var users = jQuery.parseJSON(datos);
                for (var x of users) {
                    $("div#editarform").find("input[type='text']:eq(0)").val(x.nombre);
                    $("div#editarform").find("input[type='text']:eq(1)").val(x.apellidos);
                    $("div#editarform").find("input[type='text']:eq(2)").val(x.usuario);
                    $("div#editarform").find("input[type='text']:eq(3)").val(x.email);
                    $("div#editarform").find("input[type='password']:eq(0)").val(x.password);
                }
                

            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });

    });
    //Boton de editar que edita esos datos

    $("div#editarform").find("#editinput").on("click", function () {
        //ejecutamos AJAX	
        datauser = $("form#formed").serialize();
        $.ajax({
            type: "GET",
            url: "php/editaruser.php?id=" + cod,
            data: datauser,
            success: function (datos) {
                
                $("div#editarform").css({ "display": "none" });

                actualizar();
            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    })

    //Comienzo validaciones

    $("#nombre").blur(function () {
        if ($("#nombre").val() == "") {
            $("#nombre").css({ "background-color": "red" });
            $("#nombre").focus();
        }
        else {
            $("#nombre").css({ "background-color": "" });

        }
    })
    $("#nombre").keyup(function(){

        if ($("#nombre").val() == "") {
            $("#nombre").css({ "background-color": "red" });
        }
        else {
            $("#nombre").css({ "background-color": "" });

        }
    });

    $("#apellido").blur(function () {
        if ($("#apellido").val() == "") {
            $("#apellido").css({ "background-color": "red" });
            $("#apellido").focus();
        }
        else {
            $("#apellido").css({ "background-color": "" });

        }
    })
    $("#apellido").keyup(function(){

        if ($("#apellido").val() == "") {
            $("#apellido").css({ "background-color": "red" });
        }
        else {
            $("#apellido").css({ "background-color": "" });

        }
    });

    $("#usuario").blur(function () {
        if ($("#usuario").val() == "") {
            $("#usuario").css({ "background-color": "red" });
            $("#usuario").focus();
        }
        else {
            $("#usuario").css({ "background-color": "" });

        }
    })
    $("#usuario").keyup(function(){

        if ($("#usuario").val() == "") {
            $("#usuario").css({ "background-color": "red" });
        }
        else {
            $("#usuario").css({ "background-color": "" });

        }
    });

    $("#correo").blur(function(){
        if($("#correo").val() == ""){
            $("#correo").css({ "background-color": "red" });
            $("#correo").focus();
        }
        
    })
   
    $("#correo").keyup(function(){
        if (IsEmail($("#correo").val()) == false) {
            $("#correo").css({ "background-color": "red" });
            $("#correo").blur(function(){
                if(IsEmail($("#correo").val()) == false){
                    $("#correo").focus();
                }
                
            })
            
        }
        else {
            $("#correo").css({ "background-color": "" });

        }
    })
    var strength =1;

    $("#password").keyup(function () {
        strength = 1

        var arr = [/.{5,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/, /[!@#\$%\^\&*\)\(+=._-]/];
        jQuery.map(arr, function (regexp) {
            if ($("#password").val().match(regexp)) {
                strength++;
            }

        });

        if (strength < 6) {
            $("#password").css({ "background-color": "red" });
            $("#password").focus();
        }
        else {
            $("#password").css({ "background-color": "" });
        }
        console.log(strength);


    });
    $("#password").blur(function () {
        if (strength < 6) {
            $("#password").css({ "background-color": "red" });
            $("#password").focus();
        }
        else {
            $("#password").css({ "background-color": "" });
        }
    })

   
    function IsEmail(email) {
        var regex =
            /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }

    //Fin validacines

    //Funcion actualizar

    function actualizar() { 
        $("#campo .container .row").empty();
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
     }


    

});