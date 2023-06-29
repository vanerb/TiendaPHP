$(document).ready(function () {
    //Muestra la informacion ampliada del producto
    $.ajax({
        type: "GET",
        url: "php/findproductoshow.php",
        success: function (datos) {
            var usuarios = jQuery.parseJSON(datos);
            for (var x of usuarios) {
                let descripcion = x.descripcion;
                let descripcioncorta = descripcion.split("|");
                $("<h1>" + x.nombre + "</h1><p>" + descripcioncorta[1] + "</p><h3>" + x.precio + "</h3><hr>").appendTo("#content");
                $("<div id='btcomprar'><p><button type='button' name='" + x.id + "' id='comprar'>Comprar</button></p></div>").appendTo("#comprar");
                $("<img src='" + x.imagen + "' heigth='300' width='300'>").appendTo("#image");

            }


        },
        error: function (xhr) {
            alert("Atencion: se ha producido un error");
            $("#mensaje1").append(xhr.statusText + xhr.responseText);
        },
    });

    var cod;
    //Dialogo de aviso de que el producto a sido añadido a la cesta
    $('<div id="dialog" title="Producto añadido"><p>El producto ha sido añadido con exito</p></div>').appendTo("body");
    $("#dialog").css({"display":"none"});
    //Boton comprar del producto
    $("body").on("click", "#comprar", function () {

        cod = $(this).parents("#comprar #btcomprar").find('button[type="button"]').attr('name');
        console.log(cod);
        
        $.ajax({
            type: "GET",
            url: "php/cesta.php?prod=" + cod,
            success: function (datos) {
                    $( "#dialog" ).dialog();
                

            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    });
});