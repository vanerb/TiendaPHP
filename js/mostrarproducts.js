$(document).ready(function () {

    //Funcion actualizar
    actualizar();


    var buscar
    var cod;

    //Filtro del desplegable del menu principal

    $("#filter").on("change", function () {
        cod = $('option:selected').val();
        $("#products .row").empty();
        console.log(buscar);
        console.log(cod);
        if (buscar == null) {
            if (cod == "todo") {
                $.ajax({
                    type: "GET",
                    url: "php/showproducts.php",
                    success: function (datos) {

                        actualizar();



                    },
                    error: function (xhr) {
                        alert("Atencion: se ha producido un error");
                        $("#mensaje1").append(xhr.statusText + xhr.responseText);
                    },
                });
            }
            else {
                $.ajax({
                    type: "GET",
                    url: "php/filterproduct.php?id=" + cod,
                    success: function (datos) {
                        let prod = new Array();
                        var producto = jQuery.parseJSON(datos);
                        for (var x of producto) {
                            prod.push({
                                id: x.id,
                                name: x.nombre,
                                descripcion: x.descripcion,
                                precio: x.precio,
                                cantidad: x.cantidad,
                                imagen: x.imagen

                            })
                        }

                        for (let i = 0; i < prod.length; i++) {
                            let descripcion = prod[i].descripcion;
                            let descripcioncorta = descripcion.split("|");
                            $("<div class='col-sm-4'><div id=" + prod[i].id + " class='card'><img src='" + prod[i].imagen + "' alt='Denim Jeans' style='width:100%'><h2>" + prod[i].name + "</h2><p class='price'>" + prod[i].precio + "</p><p>" + descripcioncorta[0] + "</p><div id='btcomprar'><p><button type='button' name='" + prod[i].id + "' id='comprar'>Comprar</button></p></div></div></div>").appendTo("#products .row");
                            $("#" + prod[i].id + " p:eq(1)").css({ "visibility": "hidden" });

                            $("#" + prod[i].id).on("click", function () {

                            })

                            $("#" + prod[i].id).mouseover(function () {
                                $("#" + prod[i].id + " p:eq(1)").css({ "visibility": "visible" });
                            })

                            $("#" + prod[i].id).mouseleave(function () {
                                $("#" + prod[i].id + " p:eq(1)").css({ "visibility": "hidden" });


                            })
                        }



                    },
                    error: function (xhr) {
                        alert("Atencion: se ha producido un error");
                        $("#mensaje1").append(xhr.statusText + xhr.responseText);
                    },
                });
            }
        }
        else {
            if (cod == "todo") {
                $.ajax({
                    type: "GET",
                    url: "php/showproducts.php",
                    success: function (datos) {

                        actualizar();
                        buscar = "";
                        $('#buscarhold').val("");

                    },
                    error: function (xhr) {
                        alert("Atencion: se ha producido un error");
                        $("#mensaje1").append(xhr.statusText + xhr.responseText);
                    },
                });
            }
            else{
                $.ajax({
                    type: "GET",
                    url: "php/filtroavanzado.php?busqueda=" + buscar + "&id=" + cod,
                    success: function (datos) {
                        $("#products .row").empty();
                        let prodss = new Array();
                        var productoss = jQuery.parseJSON(datos);
                        for (var x of productoss) {
                            prodss.push({
                                id: x.id,
                                name: x.nombre,
                                descripcion: x.descripcion,
                                precio: x.precio,
                                cantidad: x.cantidad,
                                imagen: x.imagen
    
                            })
                        }
    
                        for (let i = 0; i < prodss.length; i++) {
                            let descripcion = prodss[i].descripcion;
                            let descripcioncorta = descripcion.split("|");
                            $("<div class='col-sm-4'><div id=" + prodss[i].id + " class='card'><img src='" + prodss[i].imagen + "' alt='Denim Jeans' style='width:100%'><h2>" + prodss[i].name + "</h2><p class='price'>" + prodss[i].precio + "</p><p>" + descripcioncorta[0] + "</p><div id='btcomprar'><p><button type='button' name='" + prodss[i].id + "' id='comprar'>Comprar</button></p></div></div></div>").appendTo("#products .row");
                            $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "hidden" });
    
                            $("#" + prodss[i].id).on("click", function () {
    
                            })
    
                            $("#" + prodss[i].id).mouseover(function () {
                                $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "visible" });
                            })
    
                            $("#" + prodss[i].id).mouseleave(function () {
                                $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "hidden" });
    
    
                            })
                        }
    
    
    
                    },
                    error: function (xhr) {
                        alert("Atencion: se ha producido un error");
                        $("#mensaje1").append(xhr.statusText + xhr.responseText);
                    },
                });
            }
            


            
        }




    });

    //Boton buscar del buscador 

    $("#search").on("click", "#buscar", function () {
        buscar = $('#buscarhold').val();

        if (cod == null || cod == "todo") {
            $.ajax({
                type: "GET",
                url: "php/searchproducts.php?producto=" + buscar,
                success: function (datos) {
                    $("#products .row").empty();
                    let prodss = new Array();
                    var productoss = jQuery.parseJSON(datos);
                    for (var x of productoss) {
                        prodss.push({
                            id: x.id,
                            name: x.nombre,
                            descripcion: x.descripcion,
                            precio: x.precio,
                            cantidad: x.cantidad,
                            imagen: x.imagen

                        })
                    }

                    for (let i = 0; i < prodss.length; i++) {
                        let descripcion = prodss[i].descripcion;
                        let descripcioncorta = descripcion.split("|");
                        $("<div class='col-sm-4'><div id=" + prodss[i].id + " class='card'><img src='" + prodss[i].imagen + "' alt='Denim Jeans' style='width:100%'><h2>" + prodss[i].name + "</h2><p class='price'>" + prodss[i].precio + "</p><p>" + descripcioncorta[0] + "</p><div id='btcomprar'><p><button type='button' name='" + prodss[i].id + "' id='comprar'>Comprar</button></p></div></div></div>").appendTo("#products .row");
                        $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "hidden" });

                        $("#" + prodss[i].id).on("click", function () {

                        })

                        $("#" + prodss[i].id).mouseover(function () {
                            $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "visible" });
                        })

                        $("#" + prodss[i].id).mouseleave(function () {
                            $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "hidden" });


                        })
                    }



                },
                error: function (xhr) {
                    alert("Atencion: se ha producido un error");
                    $("#mensaje1").append(xhr.statusText + xhr.responseText);
                },
            });
        }
        else {
            $.ajax({
                type: "GET",
                url: "php/filtroavanzado.php?busqueda=" + buscar + "&id=" + cod,
                success: function (datos) {
                    $("#products .row").empty();
                    let prodss = new Array();
                    var productoss = jQuery.parseJSON(datos);
                    for (var x of productoss) {
                        prodss.push({
                            id: x.id,
                            name: x.nombre,
                            descripcion: x.descripcion,
                            precio: x.precio,
                            cantidad: x.cantidad,
                            imagen: x.imagen

                        })
                    }

                    for (let i = 0; i < prodss.length; i++) {
                        let descripcion = prodss[i].descripcion;
                        let descripcioncorta = descripcion.split("|");
                        $("<div class='col-sm-4'><div id=" + prodss[i].id + " class='card'><img src='" + prodss[i].imagen + "' alt='Denim Jeans' style='width:100%'><h2>" + prodss[i].name + "</h2><p class='price'>" + prodss[i].precio + "</p><p>" + descripcioncorta[0] + "</p><div id='btcomprar'><p><button type='button' name='" + prodss[i].id + "' id='comprar'>Comprar</button></p></div></div></div>").appendTo("#products .row");
                        $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "hidden" });

                        $("#" + prodss[i].id).on("click", function () {

                        })

                        $("#" + prodss[i].id).mouseover(function () {
                            $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "visible" });
                        })

                        $("#" + prodss[i].id).mouseleave(function () {
                            $("#" + prodss[i].id + " p:eq(1)").css({ "visibility": "hidden" });


                        })
                    }



                },
                error: function (xhr) {
                    alert("Atencion: se ha producido un error");
                    $("#mensaje1").append(xhr.statusText + xhr.responseText);
                },
            });
        }


    })

    //Boton de las tarjetas de los productos
    $("body").on("click", ".col-sm-4", function () {
        cod = $(this).find(".card").attr('id');
        console.log(cod);

        $.ajax({
            type: "GET",
            url: "php/findproducto.php?id=" + cod,
            success: function (datos) {
                window.location.href = "productinfo.html"
            },
            error: function (xhr) {
                alert("Atencion: se ha producido un error");
                $("#mensaje1").append(xhr.statusText + xhr.responseText);
            },
        });

    })



    //Rellena el select con los generos
    $.ajax({
        type: "GET",
        url: "php/showgenero.php",
        success: function (datos) {
            let genero = new Array();
            var generos = jQuery.parseJSON(datos);
            for (var x of generos) {
                genero.push({
                    id: x.id,
                    name: x.genero

                })
            }

            for (let i = 0; i < genero.length; i++) {
                $("<option value=" + genero[i].id + ">" + genero[i].name + "</option>").appendTo("#filterselect");
            }



        },
        error: function (xhr) {
            alert("Atencion: se ha producido un error");
            $("#mensaje1").append(xhr.statusText + xhr.responseText);
        },
    });

    //muestra los productos
    function actualizar() {
        $.ajax({
            type: "GET",
            url: "php/showproducts.php",
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
    }
});