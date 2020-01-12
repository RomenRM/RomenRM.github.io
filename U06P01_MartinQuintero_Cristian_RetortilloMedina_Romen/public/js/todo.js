const expresionCorreo=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/,aceptPassw=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;registered=()=>{document.getElementById("registrado").style.display="inline",document.getElementById("NoLog").style.display="inline",document.getElementById("registro").style.display="none",document.getElementById("Info").innerHTML=" "},crear=()=>{document.getElementById("registrado").style.display="none",document.getElementById("NoLog").style.display="none",document.getElementById("registro").style.display="inline",document.getElementById("Info").innerHTML=" "},acceso=()=>{document.getElementById("registrado").style.display="none",document.getElementById("registro").style.display="none",document.getElementById("NoLog").style.display="none",document.getElementById("Logged").style.display="inline",document.getElementById("usuario").style.display="inline"},registrar=()=>{let e=document.getElementById("Nombre").value,t=document.getElementById("Pass").value,o="";expresionCorreo.test(e)?aceptPassw.test(t)?firebase.auth().createUserWithEmailAndPassword(e,t).catch((function(e){var t=e.code,o=e.message;"auth/weak-password"==t?alert("The password is too weak."):alert(o),console.log(e)})).then(e=>{if(null!=e){document.getElementById("Nombre").value="",document.getElementById("Pass").value="";let t=e.user;document.getElementById("saludo").innerHTML=`Bienvenido  ${t.email}`,acceso()}}):o="Contraseña introducida no valida compruebe que la longitud es de entre 8 y 15 con al menos una mayuscula una minuscula un digito y 1 caracter especial (No se admitene espacios en blanco)":o="Correo electronico no valido",document.getElementById("Info").innerHTML=o},acceder=()=>{let e=document.getElementById("Usuario").value,t=document.getElementById("Cont").value;firebase.auth().signInWithEmailAndPassword(e,t).catch((function(e){var t=e.message;alert(t),console.log(e)})).then(e=>{let t=e.user;document.getElementById("saludo").innerHTML=`Bienvenido ${t.email}`,acceso()})},googleLogin=()=>{let e=new firebase.auth.GoogleAuthProvider;firebase.auth().signInWithPopup(e).then(e=>{let t=e.user;console.log("funciona"),document.getElementById("saludo").innerHTML=`Bienvenido ${t.displayName}`,acceso()}).catch((function(e){var t=e.message;alert(t),console.log(e)}))},gitHubSignin=()=>{let e=new firebase.auth.GithubAuthProvider;firebase.auth().signInWithPopup(e).then(e=>{let t=e.user;document.getElementById("saludo").innerHTML=`Bienvenido ${t.email}`,acceso()}).catch((function(e){var t=e.message;alert(t),console.log(e)}))},logout=()=>{firebase.auth().signOut().then((function(){document.getElementById("saludo").innerHTML="Ha cerrado su sesion",document.getElementById("registrado").style.display="none",document.getElementById("registro").style.display="inline",document.getElementById("NoLog").style.display="none",document.getElementById("Logged").style.display="none",document.getElementById("usuario").style.display="none"})).catch(console.log)};import{array}from"./array.js";var cloudmade=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"mapbox/streets-v11",accessToken:"pk.eyJ1IjoibGFzaW9yIiwiYSI6ImNrNGNvN3NoMjA3ZDEzZm8xOHgwcjQ2dDgifQ.EQD4G28oWre0DcSRiVIevg"}),mymap=L.map("mapid").setView([28.5,-16.5],10).addLayer(cloudmade),body=document.getElementById("usuario"),p=document.createElement("p"),select=document.createElement("select");select.setAttribute("name","select"),select.setAttribute("id","select");var boton=document.createElement("button");boton.setAttribute("id","boton");var botontexto=document.createTextNode("buscar"),br=document.createElement("br");body.appendChild(br),body.appendChild(boton),boton.appendChild(botontexto),body.appendChild(p),p.textContent="Codigo postal",body.appendChild(select);var option=document.createElement("option");option.setAttribute("value","-1"),option.textContent="Sin seleccionar",select.appendChild(option);for(var i=0;i<array.length;i++)(option=document.createElement("option")).setAttribute("value",array[i].properties.cp),option.textContent=array[i].properties.cp,select.appendChild(option);var p2=document.createElement("p"),filtro=document.createElement("input");filtro.setAttribute("type","search"),filtro.setAttribute("id","filtro"),body.appendChild(p2),p2.textContent="Buscar por nombre",body.appendChild(filtro);var p3=document.createElement("p"),select2=document.createElement("select");select2.setAttribute("name","select2"),select2.setAttribute("id","select2"),body.appendChild(p3),p3.textContent="Buscar por calles",body.appendChild(select2);var option2=document.createElement("option");option2.setAttribute("value","-1"),option2.textContent="Sin seleccionar",select2.appendChild(option2);var arrayCalles=new Array;Array.prototype.unique=function(e){return function(){return this.filter(e)}}((function(e,t,o){return o.indexOf(e,t+1)<0}));for(i=0;i<array.length;i++)arrayCalles.push(array[i].properties.dir);var sinDuplicados=arrayCalles.unique();for(i=0;i<sinDuplicados.length;i++)(option2=document.createElement("option")).setAttribute("value",sinDuplicados[i]),option2.textContent=sinDuplicados[i],select2.appendChild(option2);var iconoBase=L.Icon.extend({options:{iconSize:[38,60],iconAnchor:[22,44],popupAnchor:[-3,-46]}}),iconoRojo=new iconoBase({iconUrl:"/img/icono.webp"}),markers=new L.FeatureGroup;marcatodo=()=>{for(var e=0;e<array.length;e++){var t=L.marker([array[e].geometry.coordinates[1],array[e].geometry.coordinates[0]],{icon:iconoRojo});t.bindPopup("<strong>Nombre:</strong> "+array[e].properties.nombre+"<br></br> <strong>Dirección:</strong> "+array[e].properties.dir+"<br></br> <strong>Codigo Postal:</strong> "+array[e].properties.cp),markers.addLayer(t)}mymap.addLayer(markers)},filtrararray=()=>{var e=document.getElementById("filtro").value;""==e&&(e=null!=document.getElementById("otroSelect")?document.getElementById("otroSelect").value:"");var t=document.getElementById("select").value;if(""==e&&"-1"==t)quitarmarcas(),marcatodo();else{quitarmarcas();for(var o=0;o<array.length;o++){let r=array[o].properties.nombre.toLowerCase(),a=e.toLowerCase();if(r.includes(a)&&(t==array[o].properties.cp||"-1"==t)){var n=L.marker([array[o].geometry.coordinates[1],array[o].geometry.coordinates[0]],{icon:iconoRojo});n.bindPopup("<strong>Nombre:</strong> "+array[o].properties.nombre+"<br></br> <strong>Dirección:</strong> "+array[o].properties.dir+"<br></br> <strong>Codigo Postal:</strong> "+array[o].properties.cp),markers.addLayer(n)}}mymap.addLayer(markers)}},quitarmarcas=()=>{markers.clearLayers(),mymap.removeLayer(markers)};var creado=!1;elotroselect=()=>{var e=document.getElementById("usuario"),t=document.createElement("p"),o=document.createElement("select");o.setAttribute("name","otroSelect"),o.setAttribute("id","otroSelect"),document.getElementById("filtro").setAttribute("disabled",""),document.getElementById("filtro").value="",creado?(o=document.getElementById("otroSelect"),Borrar(o),"-1"==document.getElementById("select2").value?(o.previousSibling.style.display="none",o.style.display="none",document.getElementById("filtro").removeAttribute("disabled"),creado=!1):(o.previousSibling.style.display="",o.style.display="")):(e.appendChild(t),t.textContent="Nombre ",e.appendChild(o));var n=document.createElement("option");n.setAttribute("value",""),n.textContent="Sin seleccionar",o.appendChild(n);let r=document.getElementById("select2").value;for(var a=0;a<array.length;a++)r==array[a].properties.dir&&((n=document.createElement("option")).setAttribute("value",array[a].properties.nombre),n.textContent=array[a].properties.nombre,o.appendChild(n));creado=!0},Borrar=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},marcatodo(),document.getElementById("select2").addEventListener("change",elotroselect),document.getElementById("boton").addEventListener("click",filtrararray);