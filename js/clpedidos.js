$(document).ready(function () {
    //Muetsra los pedidos
    actualizar();
    //Opciones para el PDF
    const options = {
        margin: 1,
        filename: 'pedidos.pdf',
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2 
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      }

      //Boton de PDF que imprime los pedidos
    $("#pdf").click("on",function () {
        var element = document.getElementById('infopedido');
        html2pdf().from(element).set(options).save();
        })
        
    


        //Boton de devolver pedido
    $("body").on("click", "#devolver", function () {
        cod = $(this).parents("#infopedido").find('input[type="button"]').attr('name');
        console.log(cod);
        $.ajax({
            type: "GET",
            url: "php/devolverproducts.php?id=" + cod,
            success: function (datos) {
                console.log(datos);
                actualizar();
            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    })

    //Funcion que Actualiza los pedidos
    function actualizar() {
        $("#infopedido table").empty();
        $("<tr><th>Estado</th><th>Direccion</th><th>Ciudad</th><th>Codigo Postal</th><th>Producto</th></tr>").appendTo("#infopedido table")

        $.ajax({
            type: "GET",
            url: "php/searchpedido.php",
            success: function (datos) {
                let pedido = new Array();
                var pedidos = jQuery.parseJSON(datos);
                for (var x of pedidos) {
                    pedido.push({
                        id: x.id,
                        estado: x.estado,
                        direccion: x.direccion,
                        ciudad: x.ciudad,
                        codigopostal: x.codigo_postal,
                        prodnombre: x.nombre
                    })
                }

                for (let i = 0; i < pedido.length; i++) {
                    $("<tr><td>" + pedido[i].estado + "</td><td>" + pedido[i].direccion + "</td><td>" + pedido[i].ciudad + "</td><td>" + pedido[i].codigopostal + "</td><td>"+pedido[i].prodnombre+"</td><td><input id='devolver' type='button' name=" + pedido[i].id + " value='Cancelar'></td></tr>").appendTo("#infopedido table");
                }



            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    }
});