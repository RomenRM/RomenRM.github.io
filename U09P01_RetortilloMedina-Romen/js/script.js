$(document).ready(function () {

    //Filtro para los comics
    $('#fComics').keyup(function () {
        let valor = $('#fComics').val()

        $("#comics").empty()
        let spinner = $("#spinC")
        spinner.show();
        $.ajax({
            type: 'GET',
            url: 'https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5',
            dataType: 'json',
            success: function (data) {
                $("#comics").show()
                spinner.hide();
                crearComics(data, valor)
            },
            error: function (data) {
                spinner.hide();
                alert(`Error numero ${data.satus}`)
            }
        });
    });


    //Filtro para los personajes
    $('#fPersonajes').keyup(function () {
        let valor = $('#fPersonajes').val()

        $("#personajes").empty()
        let spinner = $("#spinP")
        spinner.show();
        $.ajax({
            type: 'GET',
            url: 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5',
            dataType: 'json',
            success: function (data) {
                $("#personajes").show()
                spinner.hide();
                crearPersonajes(data, valor)
            },
            error: function (data) {
                spinner.hide();
                alert(`Error numero ${data.satus}`)
            }
        });
    });

    cargarComics()
    cargarPersonajes()

    /**
     * Funcion que es la peticion ajax para crar todos los comics al inicio de la pagina
     */
    function cargarComics() {
        let spinner = $("#spinC")
        spinner.show();
        $.ajax({
            type: 'GET',
            url: 'https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5',
            dataType: 'json',
            success: function (data) {
                spinner.hide();
                crearComics(data)
            },
            error: function (data) {
                spinner.hide();
                alert(`Error numero ${data.satus}`)
            }
        });
    }

    /**
     * Funcion que es la peticion ajax para crar todos los personajes al inicio de la pagina
     */
    function cargarPersonajes() {
        let spinner = $("#spinP")
        spinner.show();
        $.ajax({
            type: 'GET',
            url: 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5',
            dataType: 'json',
            success: function (data) {
                spinner.hide();
                crearPersonajes(data)
            },
            error: function (data) {
                spinner.hide();
                alert(`Error numero ${data.satus}`)
            }
        });
    }


    /**
     * Crea todos los comics y los pagina (en caso de pasar un filtro creara solo los que cumplan el mismo)
     * @param {*} data Array de datos
     * @param {*} filtro filtro deseado para los comics
     */
    function crearComics(data, filtro) {
        let padre = document.getElementById("comics")

        //Foreach pintando los comics
        data["data"]["results"].forEach(element => {

            if (element["title"].includes(filtro) || filtro == null) {
                let div = document.createElement("div")
                let p = document.createElement("p")
                let img = document.createElement("img")
                let h = document.createElement("h2")
                let button = document.createElement("button")
                div.className = "comic"

                h.innerHTML = element["title"]

                img.src = `${element["thumbnail"]["path"]}.${element["thumbnail"]["extension"]}`
                img.addEventListener("click", ventana)
                img.id = element["title"]
                img.className = "comic"

                if (element["description"] == null)
                    p.innerHTML = "Descripcion no disponible"

                else {
                    if (element["description"].length > 20) {
                        let media = element["description"].substring(0, 19)
                        p.innerHTML = `${media}<span style="display: none;" >${element["description"].substring(20, element["description"].length - 1)}</span>`
                        button.innerHTML = "Ver mas..."
                        button.addEventListener("click", mas,false)
                    }

                    else
                        p.innerHTML = element["description"]
                }

                div.appendChild(h)
                div.appendChild(img)
                div.appendChild(p)
                if(element["description"])
                    div.appendChild(button)
                padre.appendChild(div)
            }
        });
        paginar("#comics", "#pagination")
    }

    /**
     * Crea todos los personajes y los pagina (en caso de pasar un filtro creara solo los que cumplan el mismo)
     * @param {*} data Array de datos
     * @param {*} filtro filtro deseado para los personajes
     */
    function crearPersonajes(data, filtro) {
        let padre = document.getElementById("personajes")

        //Foreach pintando los personajes
        data["data"]["results"].forEach(element => {

            if (element["name"].includes(filtro) || filtro == null) {

                let div = document.createElement("div")
                let img = document.createElement("img")
                let h = document.createElement("h2")

                div.className = "personaje"
                h.innerHTML = element["name"]
                img.src = `${element["thumbnail"]["path"]}.${element["thumbnail"]["extension"]}`
                img.addEventListener("click", ventana)
                img.id = element["name"]
                img.className = "personaje"

                div.appendChild(h)
                div.appendChild(img)
                padre.appendChild(div)
            }
        });
        paginar("#personajes", "#pagination2")
    }

    /**
     * Crea la ventana con la informacion en funcion de la imagen que hemos elegido
     */
    function ventana() {

        let clase = $(this).attr('class');
        let titulo = $(this).prev().text()
        
        //Dependiendo de la clase realizaremos una consulta u otra y pintaremos lo recivido en una ventana
        if(clase == "comic"){
            $.ajax({
                type: 'GET',
                url: 'https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5',
                dataType: 'json',
                success: function (data) {

                    data["data"]["results"].forEach(element => {

                        if (element["title"] == titulo) {
                            let ventana;

                            if(element["description"] != null)
                                ventana = $(`<div><p>${element["description"]}</p></div>`);
                            else
                                ventana = $(`<div><p>"Estamos creando la descripcion de este comic permaneced atentos para futuras actualizaciones"</p></div>`);

                            ventana.dialog({
                                modal: true,
                                title: titulo,
                                width: 750,
                                minWidth: 400,
                                maxWidth: 750,
                                show: "Fold",
                                hide: "Scale"
                            });
                        }
                    });
                },
                error: function (data) {
                    alert(`Error numero ${data.satus}`)
                }
            });
        }

        else{
            $.ajax({
                type: 'GET',
                url: 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5',
                dataType: 'json',
                success: function (data) {

                    data["data"]["results"].forEach(element => {

                        if (element["name"] == titulo) {
                            let ventana;

                            if(element["description"] != "")
                                ventana = $(`<div><p>${element["description"]}</p></div>`);
                            else
                                ventana = $(`<div><p>"Estamos desarrollando la biografia del personaje permaneced atentos"</p></div>`);

                            ventana.dialog({
                                modal: true,
                                title: titulo,
                                width: 750,
                                minWidth: 400,
                                maxWidth: 750,
                                show: "Fold",
                                hide: "Scale"
                            });
                        }
                    });
                },
                error: function (data) {
                    alert(`Error numero ${data.satus}`)
                }
            });
        }
    }

    /**
     * Muestra el texto oculto y cambia el funcionamiento a ver menos
     */
    function mas() {
        $(this).prev().find("span").show()
        this.addEventListener("click", menos)
        this.removeEventListener("click", mas)
        $(this).text("Ver menos")
    }

    /**
     * Oculta el texto y cambia el funcionamiento a ver mas
     */
    function menos() {
        $(this).prev().find("span").hide()
        this.addEventListener("click", mas)
        this.removeEventListener("click", menos)
        $(this).text("Ver mas...")
    }

    /**
     * Crea el paginado de los items
     * @param {*} id El id de lo que vamos a paginar
     * @param {*} paginado El id de donde va el paginado
     */
    function paginar(id, paginado) {
        jQuery(function ($) {
            var items = $(id).children();

            var numItems = items.length;
            var perPage = 10;

            items.slice(perPage).hide();

            $(paginado).pagination({
                items: numItems,
                itemsOnPage: perPage,
                cssStyle: "light-theme",

                onPageClick: function (pageNumber) {

                    var showFrom = perPage * (pageNumber - 1);
                    var showTo = showFrom + perPage;

                    items.hide()
                        .slice(showFrom, showTo).show();
                }
            });
        });
    }
})