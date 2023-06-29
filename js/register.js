$(document).ready(function () {
    //Comienzo validaciones
    var strength = 1;
    $( "#password" ).tooltip();

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
            enablebutton();
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


    //Boton registro de usuario
    $("form#register").find("#registerinput").on("click", function () {

        var datalog = $("#register").serialize();
        //ejecutamos AJAX	
        $.ajax({
            type: "GET",
            url: "php/adduser.php",
            data: datalog,
            success: function (datos) {
                console.log(datos);
                if (datos == "1") {
                    window.location.href = "login.html"
                }

            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });
    });


});