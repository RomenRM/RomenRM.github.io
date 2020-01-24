$(document).ready(function () {

    /**
     * Constantes de las islas y sus trajes
     */
    const islas = ["Tenerife", "La Gomera", "El Hierro", "La Palma", "Gran Canaria", "Lanzarote", "Fuerteventura"]
    const trajes = [
        { traje: 'img/54-Traje-tipico-Tenerife-mujer-min.png', isla: "Tenerife" },
        { traje: 'img/53-Traje-tipico-Tenerife-hombre-min.png', isla: "Tenerife" },
        { traje: 'img/46-Traje-tipico-de-La-Gomera-mujer-min.png', isla: "La Gomera" },
        { traje: 'img/45-Traje-tipico-de-la-Gomera-hombre-min.png', isla: "La Gomera" },
        { traje: 'img/42-Traje-tipico-de-El-Hierro-mujer-min.png', isla: "El Hierro" },
        { traje: 'img/41-Traje-tipico-de-El-Hierro-hombre-min.png', isla: "El Hierro" },
        { traje: 'img/48-Traje-tipico-de-La-Palma-mujer-min.png', isla: "La Palma" },
        { traje: 'img/47-Traje-tipico-de-La-Palma-hombre-min.png', isla: "La Palma" },
        { traje: 'img/52-Traje-tipico-Gran-Canaria-mujer-min.png', isla: "Gran Canaria" },
        { traje: 'img/51-Traje-Tipico-Gran-Canaria-hombre-min.png', isla: "Gran Canaria" },
        { traje: 'img/50-Traje-tipico-de-Lanzarote-mujer-min.png', isla: "Lanzarote" },
        { traje: 'img/49-Traje-tipico-de-Lanzarote-hombre-min.png', isla: "Lanzarote" },
        { traje: 'img/44-Traje-tipico-de-Fuerteventura-mujer-min.png', isla: "Fuerteventura" },
        { traje: 'img/43-Traje-tipico-de-Fuerteventura-hombre-min.png', isla: "Fuerteventura" }]

    $(".boton").button();
    $("#puntos").hide();

    /**
     * Añadimos a los botones la funcion para empezar a jugar
     */
    $(".boton").click(function () {

        $("#dificultad").hide();
        $("#puntos").show();
        $(`<div id=trajesJugar></div>`).appendTo('#juego');
        $(`<div id=islasJugar></div>`).appendTo('#juego');

        let puntos = 0
        let numero = numeroA(4, 8);
        let imagenes = 0

        let islasPartida = []
        let trajesPartida = []

        let comprueba = true;

        /**
         * Generamos los cuadrados de las islas 
         */
        while (comprueba) {

            let numero2 = numeroA(0, 7)

            if (!islasPartida.includes(islas[numero2])) {
                islasPartida.push(islas[numero2])
                $(`<div id="${islas[numero2]}" class=islasP>${islas[numero2]}</div>`).appendTo('#islasJugar');

            }

            if (islasPartida.length == numero)
                comprueba = false
        }

        /**
         * Generamos los trajes
         */
        while (imagenes < $(this).attr("value")) {
            let numero3 = numeroA(0, 13)

            if (!trajesPartida.includes(trajes[numero3]["traje"])) 
                if(islasPartida.includes(trajes[numero3]["isla"])){
                    trajesPartida.push(trajes[numero3]["traje"])
                    $(`<div><img id="${trajes[numero3]["isla"]}" src="${trajes[numero3]["traje"]}" class=imagenes></img></div>`).appendTo('#trajesJugar');
                    imagenes++
                }
            
        }

        /**
        * Añadimos la funcion de arrastras a los trajes por toda la zona de juego pero no en el exterior de esta
        */
        $("#trajesJugar").find("img").each(function () {
            $(this).draggable({
                cursor: 'move',
                containment: $(this).parent().parent().parent()
            });
        });

        let opciones = $("#trajesJugar").find("img").length;
        let posicionado = 0;

        /**
        * Añadimos la opcion de permitir el drop de los trajes en los cuadrados de las islas y generamos mensages en funcioon de si el id del traje es igual al de la isla
        */
        $("#islasJugar").find("div").droppable({

            drop: function (evento, imagen) {

                if (imagen.draggable.attr("id") == $(this).attr("id")) {
                    imagen.draggable.css("border","1px solid green")
                    puntos++
                    $("#Puntuacion").html(puntos)
                    toastr.success(`Acertaste, ganas 1 punto y tienes <strong>${$("#Puntuacion").html()}</strong> puntos en total.`, 'Respuesta Correcta');
                }

                else{
                    imagen.draggable.css("border","1px solid red")
                    toastr.error(`Has fallado, el traje era de <strong>${imagen.draggable.attr("id")}</strong> fijate mas en el siguinte intento.`, `Respuesta Erronea`);
                }
                    
                $(imagen.draggable).draggable("destroy")
                posicionado++

                if (opciones == posicionado)
                    ventana();
            }
        });
    })

    /**
     * Funcion que genera un numero aleatorio entre un minimo (incluido) y un maximo (excluido)
     */
    numeroA = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Funcion que genera la ventana emergente al finalizar la partida con las opciones de volver a jugar o quedarnos en la pantalla del final
     */
    ventana = () => {
        let ventana = $(`<div title="Volver a jugar?"><p>Su puntuacion final fue de ${$("#Puntuacion").html()} puntos</p><br/><p>Desea volver a jugar?</p></div>`);
        ventana.dialog({
            modal: true,
            title: "Volver a jugar?",
            width: 550,
            minWidth: 400,
            maxWidth: 650,
            show: "Fold",
            hide: "Scale",
            buttons: {
                "Si": function () {
                    $("#juego").empty();
                    $("#dificultad").show();
                    $("#Puntuacion").html("0")
                    $("#puntos").hide();
                    $(this).dialog("close");
                },
                "No": function () {
                    $(this).dialog("close");
                }
            }
        });
    }
})