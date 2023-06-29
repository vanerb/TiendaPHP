//para comprobar la sesion, es decir, si es de administrador o cliente
$(document).ready(function () {

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



//Llama a la funcion actualizar para que muestre en este caso los pedidos
    actualizar();

    //Boton de editar que hace que rellene los datos de los campos del formulario

    $("body").on("click", "#editar", function () {
        cod = $(this).parents("#container td").find('input[type="button"]').attr('name');

        $("#editarform").css({ "display": "block" })

        $.ajax({
            type: "GET",
            url: "php/findpedido.php?id=" + cod,
            success: function (datos) {
                var users = jQuery.parseJSON(datos);
                for (var x of users) {
                    $("div#editarform").find("input[type='text']:eq(1)").val(x.direccion);
                    $("div#editarform").find("input[type='text']:eq(2)").val(x.ciudad);
                    $("div#editarform").find("input[type='text']:eq(0)").val(x.id_usuario);
                    $("div#editarform").find("input[type='number']:eq(0)").val(x.codigo_postal);
                    $("div#editarform").find("input[type='number']:eq(1)").val(x.id_cesta);

                    //$("div#editarform").find("#usuario").val(x.id_usuario);
                    $("div#editarform").find("#pedido").val(x.estado);

                }


            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });

    });

    //Boton de editar
    $("#editarform").on("click", "#editar", function () {
        data = $("form#formed").serialize();
        console.log(data);
        $.ajax({
            type: "GET",
            url: "php/editpedido.php?id=" + cod,
            data: data,
            success: function (datos) {
                console.log(datos);

                actualizar();
                $("#editarform").css({ "display": "none" })




            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });


    });

    //Boton eliminar pedidos

    $("body").on("click", "#eliminar", function () {
        cod = $(this).parents("#container td").find('input[type="button"]').attr('name');
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Delete all items": function () {
                    $.ajax({
                        type: "GET",
                        url: "php/deletepedido.php?id=" + cod,
                        success: function (datos) {
                            actualizar();

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

    //Comienzo validaciones de campos

    $("#direccion").blur(function(){
        if($("#direccion").val() == ""){
            $("#direccion").css({"backgroundColor":"red"});
            $("#direccion").focus();
        }
        else{
            $("#direccion").css({"backgroundColor":""});

        }
    })
    $("#ciudad").blur(function(){
        if($("#ciudad").val() == ""){
            $("#ciudad").css({"backgroundColor":"red"});
            $("#ciudad").focus();
        }
        else{
            $("#ciudad").css({"backgroundColor":""});

        }
    })

    $("#codigo").blur(function(){
        if($("#codigo").val() == ""){
            $("#codigo").css({"backgroundColor":"red"});
            $("#codigo").focus();
        }
        else{
            $("#codigo").css({"backgroundColor":""});

        }
    })
    
    //Fin validaciones


    //Funcion para actualizar
    function actualizar() {
        $("#container table").empty();
        $("<tr><th>Id</th><th>Usuario</th><th>Estado</th><th>Direccion</th><th>Ciudad</th><th>Codigo Postal</th><th>Producto</th></tr>").appendTo("#container table")
        $.ajax({
            type: "GET",
            url: "php/showpedidos.php",
            success: function (datos) {
                let pedido = new Array();
                var pedidos = jQuery.parseJSON(datos);
                for (var x of pedidos) {
                    pedido.push({
                        id: x.id,
                        estado: x.estado,
                        direccion: x.direccion,
                        usuario: x.usuario,
                        ciudad: x.ciudad,
                        codigopostal: x.codigo_postal,
                        id_cesta: x.id_cesta,
                        prod_nombre: x.nombre,
                    })
                }

                for (let i = 0; i < pedido.length; i++) {
                    $("<tr><td>" + pedido[i].id + "</td><td>" + pedido[i].usuario + "</td><td>" + pedido[i].estado + "</td><td>" + pedido[i].direccion + "</td><td>" + pedido[i].ciudad + "</td><td>" + pedido[i].codigopostal + "</td><td>"+pedido[i].prod_nombre+"</td><td><input id='editar' type='button' name=" + pedido[i].id + " value='Editar'></td><td><input id='eliminar' type='button' name=" + pedido[i].id + " value='Eliminar'></td></tr>").appendTo("#container table");
                }



            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    }
});