$(document).ready(function () {
    var cod;
    
    //Boton de comprar
    $("body").on("click", "#comprar", function () {

        cod = $(this).parents("#products #btcomprar").find('button[type="button"]').attr('name');
        console.log(cod);
        $.ajax({
            type: "GET",
            url: "php/cesta.php?prod=" + cod,
            success: function (datos) {
                
                

            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    });
});