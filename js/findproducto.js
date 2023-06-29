$(document).ready(function () {

    //Muestra los productos del bsucador
    $.ajax({
        type: "GET",
        url: "php/findproductos.php?id=",
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
                    imagen: x.imagen

                })
            }


            for (let i = 0; i < products.length; i++) {
                let descripcion = products[i].descripcion;
                let descripcioncorta = descripcion.split("|");
                $("<div class='col-sm-4'><div id=" + products[i].id + " class='card'><img src='" + products[i].imagen + "' alt='Denim Jeans' style='width:100%'><h2>" + products[i].name + "</h2><p class='price'>" + products[i].precio + "</p><p>" + descripcioncorta[0] + "</p><div id='btcomprar'><p><button type='button' name='" + products[i].id + "' id='comprar'>Comprar</button></p></div></div></div>").appendTo("#products .row");
                $("#" + products[i].id + " p:eq(1)").css({ "visibility": "hidden" });

                $("#" + products[i].id).on("click", function () {

                })

                $("#" + products[i].id).mouseover(function () {
                    $("#" + products[i].id + " p:eq(1)").css({ "visibility": "visible" });
                })

                $("#" + products[i].id).mouseleave(function () {
                    $("#" + products[i].id + " p:eq(1)").css({ "visibility": "hidden" });


                })

            }


        },
        error: function (xhr) {
            alert("Atencion: se ha producido un error");
            $("#mensaje1").append(xhr.statusText + xhr.responseText);
        },
    });
});