$(document).ready(function () {

    //Funcion actualizar
    actualizar();
    

    //Comienzo validaciones
    $("#fname").keyup(function(){
        if($("#fname").val() == ""){
            $("#fname").css({"backgroundColor":"red"})
        }
        else{
            $("#fname").css({"backgroundColor":""})

        }
    })

    $("#fname").blur(function(){
        if($("#fname").val() == ""){
            $("#fname").css({"backgroundColor":"red"})
            $("#fname").focus();
        }
        else{
            $("#fname").css({"backgroundColor":""})

        }
    })

    $("#adr").keyup(function(){
        if($("#adr").val() == ""){
            $("#adr").css({"backgroundColor":"red"})
        }
        else{
            $("#adr").css({"backgroundColor":""})

        }
    })

    $("#adr").blur(function(){
        if($("#adr").val() == ""){
            $("#adr").css({"backgroundColor":"red"})
            $("#adr").focus();
        }
        else{
            $("#adr").css({"backgroundColor":""})

        }
    })

    $("#city").keyup(function(){
        if($("#city").val() == ""){
            $("#city").css({"backgroundColor":"red"})
        }
        else{
            $("#city").css({"backgroundColor":""})

        }
    })

    $("#city").blur(function(){
        if($("#city").val() == ""){
            $("#city").css({"backgroundColor":"red"})
            $("#city").focus();
        }
        else{
            $("#city").css({"backgroundColor":""})

        }
    })

    $("#zip").keyup(function(){
        if($("#zip").val() == ""){
            $("#zip").css({"backgroundColor":"red"})
        }
        else{
            $("#zip").css({"backgroundColor":""})

        }
    })

    $("#zip").blur(function(){
        if($("#zip").val() == ""){
            $("#zip").css({"backgroundColor":"red"})
            $("#zip").focus();
        }
        else{
            $("#zip").css({"backgroundColor":""})

        }
    })

    $("#email").blur(function(){
        if($("#email").val() == ""){
            $("#email").css({ "background-color": "red" });
            $("#email").focus();
        }
        
    })
   
    $("#email").keyup(function(){
        if (IsEmail($("#email").val()) == false) {
            $("#email").css({ "background-color": "red" });
            $("#email").blur(function(){
                if(IsEmail($("#email").val()) == false){
                    $("#email").focus();
                }
                
            })
            
        }
        else {
            $("#email").css({ "background-color": "" });

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

    //Boton pagar del checkout

    $("form#formcheckout").find("#checkoutbt").on("click", function(){
        var data = $("#formcheckout").serialize();
        $.ajax({
            type: "GET",
            url: "php/addpedido.php",
            data: data,
            success: function (datos) {
                console.log(datos);
                if(datos == "added"){
                    window.location.href = "index.html";
                }
    
            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    })

    //Boton eliminar eleemto de la cesta
    $("body").on("click", "input#eliminar", function(){
        cod = $(this).parents("#cesta p").find('input[type="button"]').attr('name');

        $.ajax({
            type: "GET",
            url: "php/deletecesta.php?codigo="+cod,
            success: function (datos) {
                console.log("eliminado");
                actualizar();
                
    
            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
        
    })

    //funcion actualizar
    function actualizar() { 
        $("#cesta").empty();
        $.ajax({
            type: "GET",
            url: "php/showcesta.php",
            success: function (datos) {
                let cesta = new Array();
                var cestainfo = jQuery.parseJSON(datos);
                for (var x of cestainfo) {
                    cesta.push({
    
                        nombre: x.nombre,
                        precio:x.precio,
                        iduser:x.id_usuario,
                        idprod:x.id_producto
                    })
                }
    
                var sumaprecio = 0;
                for (let i = 0; i < cesta.length; i++) {
                    console.log(cesta[i].precio);
                    sumaprecio += parseFloat(cesta[i].precio);
                    $("<p><a href='#'>"+cesta[i].nombre+"</a><input id='eliminar' name='"+cesta[i].iduser+","+cesta[i].idprod+"' type='button' value='Eliminar'> <span class='price'>"+cesta[i].precio+"</span></p>").appendTo("#cesta");
                }
    
                console.log(sumaprecio);
                $("<hr><p>Total <span class='price' style='color:black'><b>"+sumaprecio.toFixed(2)+"</b></span></p>").appendTo("#cesta");
    
                    
                
    
            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
     }


   
});