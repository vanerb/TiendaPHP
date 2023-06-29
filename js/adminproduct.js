$(document).ready(function () {
    //Check session para saber si es administrador o cliente normal
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

    //Muestra los productos en la tabla
    
    $.ajax({
        type: "GET",
        url: "php/showproductsinfo.php",
        success: function (datos) {
                let products = new Array();
                var usuarios = jQuery.parseJSON(datos);
                for (var x of usuarios) {
                    products.push({
                        id:x.id,
                        name:x.nombre,
                        descripcion:x.descripcion,
                        precio: x.precio,
                        cantidad: x.cantidad,
                        imagen: x.imagen,
                        genero:x.genero,

                    })
                }
                $("<input id='imagen' name='imagen' type='hidden' value='"+x.imagen+"'>").appendTo("#formed");

                for(let i = 0;i<products.length;i++){
                    $("<tr><td>"+products[i].id+"</td><td>"+products[i].name+"</td><td>"+products[i].descripcion+"</td><td>"+products[i].precio+"</td><td>"+products[i].cantidad+"</td><td>"+products[i].imagen+"</td><td>"+products[i].genero+"</td><td><input id='editar' type='button' name="+products[i].id+" value='Editar'></td><td><input id='eliminar' type='button' name="+products[i].id+" value='Eliminar'></td></tr>").appendTo("#container table");
                }
                
            

        },
        error: function (xhr) {
            alert("Atencion: se ha producido un error");
            $("#mensaje1").append(xhr.statusText + xhr.responseText);
        },
    });

    //Aviso que sale si un producto esta con un pedido activo
    $('<div id="dialog-message" title="AVISO"><p><span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>No se puede eliminar este producto porque hay pedidos en curso</p></div>').appendTo("body");
    $("#dialog-message").css({"display":"none"})

    //Boton de eliminar producto
    $("body").on("click", "input#eliminar", function () {
        var cod = $(this).parents("#container table td").find('input[type="button"]').attr('name');

        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Delete all items": function () {
                    console.log(cod);
                    $.ajax({
                        type: "GET",
                        url: "php/deleteproduct.php?id=" + cod,
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
        //ejecutamos AJAX	

    });

    var cod;
    //Boton editar que rellena los datos
    $("body").on("click", "input#editar", function () {

        cod = $(this).parents("#container table td").find('input[type="button"]').attr('name');

        $("div#editarform").css({ "display": "block" });
        $.ajax({
            type: "GET",
            url: "php/buscarproduct.php?id=" + cod,
            success: function (datos) {
                var users = jQuery.parseJSON(datos);
                for (var x of users) {
                    $("div#editarform").find("input[type='text']:eq(0)").val(x.nombre);
                    $("div#editarform").find("input[type='text']:eq(1)").val(x.descripcion);
                    $("div#editarform").find("input[type='number']:eq(0)").val(x.precio);
                    $("div#editarform").find("input[type='text']:eq(2)").val(x.cantidad);

                    $("div#editarform").find("#genero").val(x.id_genero);
                    $("div#editarform").find("#imagened").val(x.imagen);
                }


            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });

    });

    //Boton de editar que afecta a los datos
    $("form#formed").find("#editinput").on("click", function (e) {
        e.preventDefault();
        var dataed = new FormData();
        //Form data
        var form_data = $('#formed').serializeArray();
        $.each(form_data, function (key, input) {
            dataed.append(input.name, input.value);
        });

        var file_data = $('input[name="imagen"]')[0].files;
        for (var i = 0; i < file_data.length; i++) {
            dataed.append("imagen[]", file_data[i]);
        }

        //Custom data
        dataed.append('key', 'value');
        $.ajax({
            type: "POST",
            url: "php/editproduct.php?id=" + cod,
            data: dataed,
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            success: function (datos) {
                
                    actualizar();

                    $("div#editarform").css({ "display": "none" });
                
                
                



            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });


    })

   //Esto hace que se rellene los datos del select con los generos

    $.ajax({
        type: "GET",
        url: "php/showgenero.php",
        success: function (datos) {
            let generoadd = new Array();
            var generosadd = jQuery.parseJSON(datos);
            for (var x of generosadd) {
                generoadd.push({
                    id: x.id,
                    name: x.genero

                })
            }

            for (let i = 0; i < generoadd.length; i++) {
                $("<option value=" + generoadd[i].id + ">" + generoadd[i].name + "</option>").appendTo("#genero");
            }



        },
        error: function (xhr) {
            alert("Atencion: se ha producido un error");
            $("#mensaje1").append(xhr.statusText + xhr.responseText);
        },
    });

    //Comienzo validaciones

    $("#nombre").blur(function(){
        if($("#nombre").val() == ""){
            $("#nombre").css({"backgroundColor":"red"});
            $("#nombre").focus();
        }
        else{
            $("#nombre").css({"backgroundColor":""});
        }
    })
    $("#nombre").keyup(function(){
        if($("#nombre").val() == ""){
            $("#nombre").css({"backgroundColor":"red"});
        }
        else{
            $("#nombre").css({"backgroundColor":""});
        }
    })

    $("#descripcion").blur(function(){
        if($("#descripcion").val() == ""){
            $("#descripcion").css({"backgroundColor":"red"});
            $("#descripcion").focus();
        }
        else{
            $("#descripcion").css({"backgroundColor":""});
        }
    })
    $("#descripcion").keyup(function(){
        if($("#descripcion").val() == ""){
            $("#descripcion").css({"backgroundColor":"red"});
        }
        else{
            $("#descripcion").css({"backgroundColor":""});
        }
    })

    $("#imagen").blur(function(){
        if($("#imagen").val() == ""){
            $("#imagen").css({"backgroundColor":"red"});
        }
        else{
            $("#imagen").css({"backgroundColor":""});
        }
    })

    
    $("#cantidad").blur(function(){
        if($("#cantidad").val() == "" || $("#cantidad").val()==0){
            $("#cantidad").css({"backgroundColor":"red"});
            $("#cantidad").focus();
        }
        else{
            $("#cantidad").css({"backgroundColor":""});
        }
    })

    $("#precio").blur(function(){
        if($("#precio").val() == "" || $("#precio").val()==0){
            $("#precio").css({"backgroundColor":"red"});
            $("#precio").focus();
        }
        else{
            $("#precio").css({"backgroundColor":""});
        }
    })

    //Fin validaciones

    //Muestra los productos

    function actualizar() {
        $("#container table").empty();
        $('<tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Cantidad</th><th>Imagen</th><th>Genero</th><th colspan="2"><input type="button" value="Anadir" onclick="addproduct()"></th></tr>').appendTo("#container table");
        $.ajax({
            type: "GET",
            url: "php/showproductsinfo.php",
            success: function (datos) {
                let products = new Array();
                var usuarios = jQuery.parseJSON(datos);
                for (var x of usuarios) {
                    products.push({
                        id: x.id,
                        name: x.nombre,
                        descripcion: x.descripcion,
                        precio: x.precio,
                        cantidad: x.cantidad,
                        imagen: x.imagen,
                        genero: x.genero,

                    })
                }

                for (let i = 0; i < products.length; i++) {
                    $("<tr><td>" + products[i].id + "</td><td>" + products[i].name + "</td><td>" + products[i].descripcion + "</td><td>" + products[i].precio + "</td><td>" + products[i].cantidad + "</td><td>" + products[i].imagen + "</td><td>" + products[i].genero + "</td><td><input id='editar' type='button' name=" + products[i].id + " value='Editar'></td><td><input id='eliminar' type='button' name=" + products[i].id + " value='Eliminar'></td></tr>").appendTo("#container table");
                }



            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    }
});