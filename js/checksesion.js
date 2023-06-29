$(document).ready(function () {
    

    //Comprueba la sesion y segun lo que obtenga muestra un menu o otro
    $.ajax({
        type: "GET",
        url: "php/sesion.php",
        success: function (datos) {
            console.log(datos);
                if(datos == "1"){
                    $('<nav class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="index.html"><img src="./img/logovideojuego.png" width="50px" height="32px"></a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li><a href="index.html">Principal</a></li><li><a href="#">Contacto</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a href="userinfo.html"><span class="glyphicon glyphicon-user"></span> Mi cuenta</a></li><li id="cerrar"><a href="#"><span class="glyphicon glyphicon-chevron-left"></span>Cerrar Sesion</a></li><li><a href="pedidos.html">Mis pedidos</a></li><li><a href="checkout.html"><span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li></ul></div></div></nav>').appendTo("#menu");

                }
                else if(datos == "2"){
                    console.log("ADMIn");
                    $('<nav class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="index.html"><img src="./img/logovideojuego.png" width="50px" height="32px"></a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li><a href="index.html">Principal</a></li><li><a href="#">Contacto</a></li><li><a href="adminpanel.html">Acceso privado</a></li></ul><ul class="nav navbar-nav navbar-right"><li id="cerrar"><a href="#"><span class="glyphicon glyphicon-chevron-left"></span>Cerrar Sesion</a></li><li><a href="pedidos.html">Mis pedidos</a></li><li><a href="checkout.html"><span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li></ul></div></div></nav>').appendTo("#menu");
                }
                else{
                    console.log(window.location.pathname);
                    if(window.location.pathname == "/VideojuegosWeb/index.html" || window.location.pathname == "/VideojuegosWeb/" || window.location.pathname == "/php/videojuegos/index.html" ||  window.location.pathname == "/php/videojuegos/"){
                        $('<nav class="navbar navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="index.html"><img src="./img/logovideojuego.png" width="50px" height="32px"></a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li><a href="index.html">Principal</a></li><li><a href="#">Contacto</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a href="login.html"><span class="glyphicon glyphicon-chevron-right"></span>Iniciar Sesion</a></ul></div></div></nav>').appendTo("#menu");

                    }
                    else{
                        window.location.href = "login.html";

                    }
                    

                }
                
                
                
            

        },
    });

    $("body").on("click","#cerrar", function(){
        console.log("ssi");
        
        $.ajax({
            type: "GET",
            url: "php/sesionclose.php",
            success: function (datos) {
                    
                    window.location.href = "login.html";
                        
                    
                    
                
    
            },
        });
    })
   
});