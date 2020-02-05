$(document).ready((function(){function e(e,t){let n=document.getElementById("comics");e.data.results.forEach(e=>{if(e.title.includes(t)||null==t){let t=document.createElement("div"),s=document.createElement("p"),c=document.createElement("img"),o=document.createElement("h2"),r=document.createElement("button");if(t.className="comic",o.innerHTML=e.title,c.src=`${e.thumbnail.path}.${e.thumbnail.extension}`,c.addEventListener("click",i),c.id=e.title,c.className="comic",null==e.description)s.innerHTML="Descripcion no disponible";else if(e.description.length>20){let t=e.description.substring(0,19);s.innerHTML=`${t}<span style="display: none;" >${e.description.substring(20,e.description.length-1)}</span>`,r.innerHTML="Ver mas...",r.addEventListener("click",a,!1)}else s.innerHTML=e.description;t.appendChild(o),t.appendChild(c),t.appendChild(s),e.description&&t.appendChild(r),n.appendChild(t)}}),s("#comics","#pagination")}function t(e,t){let a=document.getElementById("personajes");e.data.results.forEach(e=>{if(e.name.includes(t)||null==t){let t=document.createElement("div"),n=document.createElement("img"),s=document.createElement("h2");t.className="personaje",s.innerHTML=e.name,n.src=`${e.thumbnail.path}.${e.thumbnail.extension}`,n.addEventListener("click",i),n.id=e.name,n.className="personaje",t.appendChild(s),t.appendChild(n),a.appendChild(t)}}),s("#personajes","#pagination2")}function i(){let e=$(this).attr("class"),t=$(this).prev().text();"comic"==e?$.ajax({type:"GET",url:"https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5",dataType:"json",success:function(e){e.data.results.forEach(e=>{if(e.title==t){let i;(i=null!=e.description?$(`<div><p>${e.description}</p></div>`):$('<div><p>"Estamos creando la descripcion de este comic permaneced atentos para futuras actualizaciones"</p></div>')).dialog({modal:!0,title:t,width:750,minWidth:400,maxWidth:750,show:"Fold",hide:"Scale"})}})},error:function(e){alert(`Error numero ${e.satus}`)}}):$.ajax({type:"GET",url:"https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5",dataType:"json",success:function(e){e.data.results.forEach(e=>{if(e.name==t){let i;(i=""!=e.description?$(`<div><p>${e.description}</p></div>`):$('<div><p>"Estamos desarrollando la biografia del personaje permaneced atentos"</p></div>')).dialog({modal:!0,title:t,width:750,minWidth:400,maxWidth:750,show:"Fold",hide:"Scale"})}})},error:function(e){alert(`Error numero ${e.satus}`)}})}function a(){$(this).prev().find("span").show(),this.addEventListener("click",n),this.removeEventListener("click",a),$(this).text("Ver menos")}function n(){$(this).prev().find("span").hide(),this.addEventListener("click",a),this.removeEventListener("click",n),$(this).text("Ver mas...")}function s(e,t){jQuery((function(i){var a=i(e).children(),n=a.length;a.slice(10).hide(),i(t).pagination({items:n,itemsOnPage:10,cssStyle:"light-theme",onPageClick:function(e){var t=10*(e-1),i=t+10;a.hide().slice(t,i).show()}})}))}$("#fComics").keyup((function(){let t=$("#fComics").val();$("#comics").empty();let i=$("#spinC");i.show(),$.ajax({type:"GET",url:"https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5",dataType:"json",success:function(a){$("#comics").show(),i.hide(),e(a,t)},error:function(e){i.hide(),alert(`Error numero ${e.satus}`)}})})),$("#fPersonajes").keyup((function(){let e=$("#fPersonajes").val();$("#personajes").empty();let i=$("#spinP");i.show(),$.ajax({type:"GET",url:"https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5",dataType:"json",success:function(a){$("#personajes").show(),i.hide(),t(a,e)},error:function(e){i.hide(),alert(`Error numero ${e.satus}`)}})})),function(){let t=$("#spinC");t.show(),$.ajax({type:"GET",url:"https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5",dataType:"json",success:function(i){t.hide(),e(i)},error:function(e){t.hide(),alert(`Error numero ${e.satus}`)}})}(),function(){let e=$("#spinP");e.show(),$.ajax({type:"GET",url:"https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=dd66a02fa0310150446ca06ab4c212f5",dataType:"json",success:function(i){e.hide(),t(i)},error:function(t){e.hide(),alert(`Error numero ${t.satus}`)}})}()}));