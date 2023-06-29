//para comprobar la sesion, es decir, si es de administrador o cliente
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "php/sesion.php",
        success: function (datos) {
            console.log(datos);
            if (datos == "1") {
                window.location.href = "login.html";

            }
            else if (datos == "2") {

            }
            else {
                console.log(window.location.pathname);
                if (window.location.pathname == "/VideojuegosWeb/index.html" || window.location.pathname == "/VideojuegosWeb/" || window.location.pathname == "/php/videojuegos/index.html" || window.location.pathname == "/php/videojuegos/") {
                    $('<nav class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="#">Logo</a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li><a href="index.html">Principal</a></li><li><a href="#">Contacto</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a href="login.html"><span class="glyphicon glyphicon-chevron-right"></span>Iniciar Sesion</a></ul></div></div></nav>').appendTo("#menu");

                }
                else {
                    window.location.href = "login.html";

                }


            }





        },
    });


//Comienzo de comprobaciones de campos del formulario

    $("#nombre").blur(function () {
        if ($("#nombre").val() == "") {
            $("#nombre").css({ "backgroundColor": "red" });
            $("#nombre").focus();
        }
        else {
            $("#nombre").css({ "backgroundColor": "" });
        }
    })
    $("#nombre").keyup(function () {
        if ($("#nombre").val() == "") {
            $("#nombre").css({ "backgroundColor": "red" });
        }
        else {
            $("#nombre").css({ "backgroundColor": "" });
        }
    })

    $("#descripcion").blur(function () {
        if ($("#descripcion").val() == "") {
            $("#descripcion").css({ "backgroundColor": "red" });
            $("#descripcion").focus();
        }
        else {
            $("#descripcion").css({ "backgroundColor": "" });
        }
    })
    $("#descripcion").keyup(function () {
        if ($("#descripcion").val() == "") {
            $("#descripcion").css({ "backgroundColor": "red" });
        }
        else {
            $("#descripcion").css({ "backgroundColor": "" });
        }
    })

    $("#imagen").blur(function () {
        if ($("#imagen").val() == "") {
            $("#imagen").css({ "backgroundColor": "red" });
        }
        else {
            $("#imagen").css({ "backgroundColor": "" });
        }
    })

    $("#cantidad").blur(function () {
        if ($("#cantidad").val() == "" || $("#cantidad").val() == 0) {
            $("#cantidad").css({ "backgroundColor": "red" });
            $("#cantidad").focus();
        }
        else {
            $("#cantidad").css({ "backgroundColor": "" });
        }
    })

    $("#precio").blur(function () {
        if ($("#precio").val() == "" || $("#precio").val() == 0) {
            $("#precio").css({ "backgroundColor": "red" });
            $("#precio").focus();
        }
        else {
            $("#precio").css({ "backgroundColor": "" });
        }
    })
//Fin comprobaciones

//Obtiene los generos dispobibles y los añade al desplegable
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

    //Boton para añadir el producto

    $("form#register").find("#anadir").on("click", function (e) {
        e.preventDefault();
        var data = new FormData();

        //Form data
        var form_data = $('#register').serializeArray();
        $.each(form_data, function (key, input) {
            data.append(input.name, input.value);
        });

        var file_data = $('input[name="imagen"]')[0].files;
        for (var i = 0; i < file_data.length; i++) {
            data.append("imagen[]", file_data[i]);
        }

        //Custom data
        data.append('key', 'value');
        $.ajax({
            url: 'php/addproduct.php', // point to server-side PHP script 
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'post',
            success: function (php_script_response) {
                if (php_script_response == "added") {
                    window.location.href = "index.html";
                } // display response from the PHP script, if any
            }
        });



    });


});