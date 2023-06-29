$(document).ready(function () {
    //Comprueba el tipo de sesion
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
});