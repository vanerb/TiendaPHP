$(document).ready(function () {
    //Checkea la session si es un administrador o cliente
    $.ajax({
        type: "GET",
        url: "php/sesion.php",
        success: function (datos) {
            console.log(datos);
                if(datos == "1"){
                    window.location.href = "login.html";

                }
                else if(datos == "2"){
                    
                }
                else{
                    console.log(window.location.pathname);
                    if(window.location.pathname == "/VideojuegosWeb/index.html" || window.location.pathname == "/VideojuegosWeb/" || window.location.pathname == "/php/videojuegos/index.html" ||  window.location.pathname == "/php/videojuegos/"){
                        $('<nav class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="#">Logo</a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li><a href="index.html">Principal</a></li><li><a href="#">Contacto</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a href="login.html"><span class="glyphicon glyphicon-chevron-right"></span>Iniciar Sesion</a></ul></div></div></nav>').appendTo("#menu");

                    }
                    else{
                        window.location.href = "login.html";

                    }
                    

                }
                

        },
    });


    //muestra los usuarios

    actualizar();


    //Aviso que sale si se intenta a eliminar un usuario con un pedido activo
    $('<div id="dialog-message" title="AVISO"><p><span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>No se puede eliminar este usuario porque tiene pedidos en curso</p></div>').appendTo("body");
    $("#dialog-message").css({"display":"none"})

    //Boton de eliminar usuario
    $("body").on("click", "input#eliminar", function () {
        var cod1 = $(this).parents("#container table td").find('input[type="button"]').attr('name');
        console.log(cod);
        //ejecutamos AJAX	
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Delete all items": function () {
                    $.ajax({
                        type: "GET",
                        url: "php/deleteuser.php?id=" + cod1,
                        success: function (datos) {
                            console.log(datos);
                            if(datos == 1){
                                actualizar();
                            }
                            else{
                                $( "#dialog-message" ).dialog({
                                    modal: true,
                                    buttons: {
                                      Ok: function() {
                                        $( this ).dialog( "close" );
                                      }
                                    }
                                  });
                            }
                            
                        },
                        error: function (xhr) {
                            alert("Atencion: se ha producido un error");
                            $("#mensaje1").append(xhr.statusText + xhr.responseText);
                        },
                    });
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });

    });

    var cod;

    //Boton editar que rellena los datos
    $("body").on("click", "input#editar", function () {

        cod = $(this).parents("#container table td").find('input[type="button"]').attr('name');
        
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


    //boton editar que modifica los datos
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
    var strength = 1;
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

    $("#repetirpassword").keyup(function () {
        if($("#repetirpassword").val() == $("#password").val()){
            $("#repetirpassword").css({"backgroundColor":""});
        }
        else{
            $("#repetirpassword").css({"backgroundColor":"red"});
        }
    });

    $("#nombre").blur(function () {
        if ($("#nombre").val() == "") {
            $("#nombre").css({ "background-color": "red" });
            $("#nombre").focus();
        }
        else {
            $("#nombre").css({ "background-color": "" });

        }
    })
    $("#nombre").keyup(function () {
        if ($("#nombre").val() == "") {
            $("#nombre").css({ "background-color": "red" });
            $("#nombre").focus();
        }
        else {
            $("#nombre").css({ "background-color": "" });

        }
    })

    $("#apellido").blur(function () {
        if ($("#apellido").val() == "") {
            $("#apellido").css({ "background-color": "red" });
            $("#apellido").focus();
        }
        else {
            $("#apellido").css({ "background-color": "" });

        }
    })
    $("#apellido").keyup(function () {
        if ($("#apellido").val() == "") {
            $("#apellido").css({ "background-color": "red" });
            $("#apellido").focus();
        }
        else {
            $("#apellido").css({ "background-color": "" });

        }
    })

    $("#usuario").blur(function () {
        if ($("#usuario").val() == "") {
            $("#usuario").css({ "background-color": "red" });
            $("#usuario").focus();
        }
        else {
            $("#usuario").css({ "background-color": "" });

        }
    })
    $("#usuario").keyup(function () {
        if ($("#usuario").val() == "") {
            $("#usuario").css({ "background-color": "red" });
            $("#usuario").focus();
        }
        else {
            $("#usuario").css({ "background-color": "" });

        }
    })
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

    //Fin validaciones


    //Funcion actualizar 

    function actualizar() {
        $("#container table").empty();
        $('<th>Id</th><th>Nombre</th><th>Apellidos</th><th>Usuario</th><th>Email</th>').appendTo("#container table")
        $.ajax({
            type: "GET",
            url: "php/showusers.php",
            success: function (datos) {
                let users = new Array();
                var usuarios = jQuery.parseJSON(datos);
                for (var x of usuarios) {
                    users.push({
                        id: x.id,
                        name: x.nombre,
                        apellido: x.apellidos,
                        usuario: x.usuario,
                        email: x.email,



                    });
                }

                for (let i = 0; i < users.length; i++) {

                    if (users[i].usuario != "Administrador") {
                        $("<tr><td>" + users[i].id + "</td><td>" + users[i].name + "</td><td>" + users[i].apellido + "</td><td>" + users[i].usuario + "</td><td>" + users[i].email + "</td><td><input id='editar' name='" + users[i].id + "' type='button' value='Editar'></td><td><input id='eliminar' name='" + users[i].id + "' type='button' value='Eliminar'></td></tr>").appendTo("#container table");

                    }
                }
            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    }

});