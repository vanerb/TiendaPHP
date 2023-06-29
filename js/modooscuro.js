$(document).ready(function () {

    //Boton de modo oscuro
if(localStorage.getItem('isDarkMode') === 'true'){
    $( "body" ).removeClass( "dark" );
        $( ".change" ).text( "OFF" );
}
else{
    $( "body" ).addClass( "dark" );
        $( ".change" ).text( "ON" );
}
$( ".change" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
        $( "body" ).removeClass( "dark" );
        $( ".change" ).text( "OFF" );
        localStorage.setItem('isDarkMode', true);
    } else {
        $( "body" ).addClass( "dark" );
        $( ".change" ).text( "ON" );
        localStorage.setItem('isDarkMode', false);
    }
});
});
    


