import {array} from './array.js'

var cloudmade = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoibGFzaW9yIiwiYSI6ImNrNGNvN3NoMjA3ZDEzZm8xOHgwcjQ2dDgifQ.EQD4G28oWre0DcSRiVIevg'
});

var mymap = L.map('mapid').setView([28.5, -16.5], 10).addLayer(cloudmade)

//Filtrar
var body = document.getElementById('usuario')
var p = document.createElement('p')
var select = document.createElement('select')
select.setAttribute('name','select')
select.setAttribute('id','select')

var boton = document.createElement('button')
boton.setAttribute('id','boton')
var botontexto = document.createTextNode('buscar')
var br = document.createElement('br')

body.appendChild(br)
body.appendChild(boton)
boton.appendChild(botontexto)

body.appendChild(p)
p.textContent = 'Codigo postal'
body.appendChild(select)

var option = document.createElement('option')
    option.setAttribute('value','-1')
    option.textContent = 'Sin seleccionar'
    select.appendChild(option)

for (var i = 0; i < array.length; i++) { 
    option = document.createElement('option')
    option.setAttribute('value',array[i]['properties']['cp'])
    option.textContent = array[i]['properties']['cp']
    select.appendChild(option)
}

var p2 = document.createElement('p')
var filtro = document.createElement('input')
filtro.setAttribute('type','search')
filtro.setAttribute('id','filtro')  

body.appendChild(p2)
p2.textContent = 'Buscar por nombre'
body.appendChild(filtro)

var p3 = document.createElement('p')
var select2 = document.createElement('select')
select2.setAttribute('name','select2')
select2.setAttribute('id','select2')

body.appendChild(p3)
p3.textContent = 'Buscar por calles'
body.appendChild(select2)

var option2 = document.createElement('option')
    option2.setAttribute('value','-1')
    option2.textContent = 'Sin seleccionar'
    select2.appendChild(option2)

var arrayCalles = new Array()

Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });

for (var i = 0; i < array.length; i++) { 
    arrayCalles.push(array[i]['properties']['dir'])
}

var sinDuplicados = arrayCalles.unique()

for (var i = 0; i < sinDuplicados.length; i++) { 
    option2 = document.createElement('option')
    option2.setAttribute('value',sinDuplicados[i])
    option2.textContent = sinDuplicados[i]
    select2.appendChild(option2)
}
                                        
var iconoBase = L.Icon.extend({ options: { iconSize: [38, 60], iconAnchor: [22, 44], popupAnchor: [-3, -46]} })
var iconoRojo = new iconoBase({iconUrl: '/img/icono.webp'})

var markers = new L.FeatureGroup()

function marcatodo() {
    for (var i = 0; i < array.length; i++) {
        var marker = L.marker([array[i]['geometry']['coordinates'][1], array[i]['geometry']['coordinates'][0]], { icon: iconoRojo })
        marker.bindPopup('<strong>Nombre:</strong> ' + array[i]['properties']['nombre'] + '<br></br> <strong>Dirección:</strong> ' + array[i]['properties']['dir'] + '<br></br> <strong>Codigo Postal:</strong> ' + array[i]['properties']['cp']
        );
        markers.addLayer(marker)
    }
    mymap.addLayer(markers)
}

function filtrararray() {

    var filtraNombre = document.getElementById('filtro').value
    if (filtraNombre == "") {
        if (document.getElementById('otroSelect') != null) {
            filtraNombre = document.getElementById('otroSelect').value
        } else {
            filtraNombre = ""
        }
    }

    var filtraCP = document.getElementById('select').value
    if (filtraNombre == "" && filtraCP == "-1") {
        quitarmarcas()
        marcatodo()
    } else {
        quitarmarcas()
        for (var i = 0; i < array.length; i++) {
            let minuscula = array[i]['properties']['nombre'].toLowerCase()
            let filtraNombreMinuscula = filtraNombre.toLowerCase()
            if (minuscula.includes(filtraNombreMinuscula)) {
                if (filtraCP == array[i]['properties']['cp'] || filtraCP == "-1") {
                var marker = L.marker([array[i]['geometry']['coordinates'][1], array[i]['geometry']['coordinates'][0]], { icon: iconoRojo })
                marker.bindPopup('<strong>Nombre:</strong> ' + array[i]['properties']['nombre'] + '<br></br> <strong>Dirección:</strong> ' + array[i]['properties']['dir'] + '<br></br> <strong>Codigo Postal:</strong> ' + array[i]['properties']['cp']
                );
                markers.addLayer(marker)
                }
            }
        }
        mymap.addLayer(markers)
    }
}

function quitarmarcas(){
    markers.clearLayers()
    mymap.removeLayer(markers)
}

var creado = false

function elotroselect() {
    var body = document.getElementById('usuario');
    var p4 = document.createElement('p')
    var otroSelect = document.createElement('select')
    otroSelect.setAttribute('name', 'otroSelect')
    otroSelect.setAttribute('id', 'otroSelect')

    document.getElementById('filtro').setAttribute('disabled','')
    document.getElementById('filtro').value = ''

    if (!creado) {
        body.appendChild(p4)
        p4.textContent = 'Nombre '
        body.appendChild(otroSelect)

    } else {
        otroSelect = document.getElementById('otroSelect')
        Borrar(otroSelect)
        if (document.getElementById('select2').value == '-1') {
            otroSelect.previousSibling.style.display = 'none'
            otroSelect.style.display = 'none'
            document.getElementById('filtro').removeAttribute('disabled')
            creado = false;
        } else {
            otroSelect.previousSibling.style.display = ''
            otroSelect.style.display = ''
        }
    }

    var option = document.createElement('option')
    option.setAttribute('value', '')
    option.textContent = 'Sin seleccionar'
    otroSelect.appendChild(option)

    let filtroCalle = document.getElementById('select2').value

    for (var i = 0; i < array.length; i++) {
        if (filtroCalle == array[i]['properties']['dir']) {
            option = document.createElement('option')
            option.setAttribute('value', array[i]['properties']['nombre'])
            option.textContent = array[i]['properties']['nombre']
            otroSelect.appendChild(option)
        }
    }
    creado = true
}

function Borrar(a) {
    while (a.firstChild) {
        a.removeChild(a.firstChild)
    }
}

marcatodo()

document.getElementById('select2').addEventListener('change', elotroselect)
document.getElementById('boton').addEventListener('click', filtrararray)