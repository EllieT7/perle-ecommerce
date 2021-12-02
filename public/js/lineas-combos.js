//Conexion BD
//lineas
const imagenesLineas = fetch("http://localhost:8080/Administrador/lineas")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      insertElementLinea(listing);
    })  
});


function insertElementLinea(imagen){
  let opcion = `<button type="button" id="ocultar_card${imagen.cod_linea}" class="boton-ocultar-lineas" data-bs-toggle="modal" data-bs-target="#ocultarLinea" onclick="actualizarOcultar(${imagen.cod_linea}, 'boton-ocultar-linea','${imagen.nombre}', 'mensaje_ocultar_linea')">
    <img id="hideCard${imagen.cod_linea}" src="../public/resources/images/iconos/ojo_rayado.svg" alt="ocultar" width="16px"/>
    </button>`;
  //Por defecto opcion muestra el boton de ocultar  
  let botonMostrar = `<button type="button" id="mostrar_card${imagen.cod_linea}" class="boton-ocultar-lineas" onclick="mostrarLinea(${imagen.cod_linea})">
    <img id="hideCard${imagen.cod_linea}" src="../public/resources/images/iconos/ojo_rayado.svg" alt="ocultar" width="16px"/>
    </button>`;
  if(!imagen.visible){
    opcion = botonMostrar;    
  }
  let html = `
    <div class="col-xs-10 col-sm-4 col-md-3 product" >
      <div class="card" name="card-linea" id="card-linea-${imagen.cod_linea}">
          <img src="..\\public\\resources\\images\\Administrador\\${imagen.src}" class="card-img-top" alt="${imagen.nombre}" id="img-linea-${imagen.cod_linea}" />
          <h3 class="card-title">${imagen.nombre}</h3>
          <button type="button" id="editar_card${imagen.cod_linea}" class="boton-editar" data-bs-toggle="modal" data-bs-target="#editarLinea" onclick="cargarDatosLinea(${imagen.cod_linea})">
              <img id="editCard${imagen.cod_linea}" src="../public/resources/images/otrasConfiguraciones/editar.svg" alt="editar" width="16px"/>
          </button>
          <button type="button" id="eliminar_card${imagen.cod_linea}" class="boton-eliminar" data-bs-toggle="modal" data-bs-target="#eliminarLinea" onclick="actualizarBotonEliminar(${imagen.cod_linea}, 'eliminar-linea','${imagen.nombre}','mensaje_eliminar_linea')">
              <img id="deleteCard${imagen.cod_linea}" src="../public/resources/images/otrasConfiguraciones/basurero_blanco.svg" alt="editar" width="16px"/>
          </button>
          ${opcion}
      </div>
    </div>
  `;
  let elemento = document.getElementById('galeria-lineas');
  elemento.innerHTML += html;
  if(!imagen.visible){
    let cardIMG = document.getElementById('img-linea-'+imagen.cod_linea);
    let card = document.getElementById('card-linea-'+imagen.cod_linea);
    card.style.backgroundColor = "#ACACAC";
    cardIMG.style.filter = "grayscale(100%)";
  }
}  
function mostrarLinea(idLinea){
  let cardIMG = document.getElementById('img-linea-'+idLinea);
  let card = document.getElementById('card-linea-'+idLinea);
  card.style.backgroundColor = "white";
  cardIMG.style.filter = "none";  
  fetch('http://localhost:8080/Administrador/lineas/ocultar-linea', {
        method: 'Post',
        body: JSON.stringify({cod_linea: idLinea, visible:1})
    }).then(x =>  console.log('ok'))
    .catch(e=> {
      console.log(e);
    });
    location.reload();
}

//Combos
const imagenesCombos = fetch("http://localhost:8080/Administrador/combos")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      insertElementCombo(listing);
    })  
});

function insertElementCombo(imagen){
  let opcion = `<button type="button" id="ocultar_card${imagen.cod_combo}" class="boton-ocultar-combos" data-bs-toggle="modal" data-bs-target="#ocultarCombo" onclick="actualizarOcultar(${imagen.cod_combo}, 'boton-ocultar-combo', '${imagen.nombre}', 'mensaje_ocultar_combo')">
    <img id="hideCard${imagen.cod_combo}" src="../public/resources/images/iconos/ojo_rayado.svg" alt="ocultar" width="16px"/>
    </button>`;
  //Por defecto opcion muestra el boton de ocultar
  let botonMostrar = `<button type="button" id="mostrar_card${imagen.cod_linea}" class="boton-ocultar-combos" onclick="mostrarCombo(${imagen.cod_combo})">
  <img id="hideCard${imagen.cod_linea}" src="../public/resources/images/iconos/ojo_rayado.svg" alt="ocultar" width="16px"/>
  </button>`;
  if(!imagen.visible){
    opcion = botonMostrar;    
  }
  let html = `
    <div class="col-xs-10 col-sm-4 col-md-3 product">
    <div class="card" name="card-combo" id="card-combo-${imagen.cod_combo}">
        <img src="..\\public\\resources\\images\\Administrador\\${imagen.src}" class="card-img-top" alt="${imagen.nombre}" id="img-combo-${imagen.cod_combo}"/>
        <h3 class="card-title">${imagen.nombre}</h3>
        <p class="card-text">${imagen.precio} Bs.</p>
        <button type="button" id="editar_card${imagen.cod_combo}" class="boton-editar" data-bs-toggle="modal" data-bs-target="#editarCombo" onclick="cargarDatosCombo(${imagen.cod_combo})">
            <img id="editCard${imagen.cod_combo}" src="../public/resources/images/otrasConfiguraciones/editar.svg" alt="editar" width="16px"/>
        </button>
        <button type="button" id="eliminar_card${imagen.cod_combo}" class="boton-eliminar" data-bs-toggle="modal" data-bs-target="#eliminarCombo" onclick="actualizarBotonEliminar(${imagen.cod_combo}, 'eliminar-combo','${imagen.nombre}','mensaje_eliminar_combo')">
            <img id="deleteCard${imagen.cod_combo}" src="../public/resources/images/otrasConfiguraciones/basurero_blanco.svg" alt="editar" width="16px"/>
        </button>
        ${opcion}
    </div>
    </div>
  `;
  let elemento = document.getElementById('galeria-combos');
  elemento.innerHTML += html;
  if(!imagen.visible){
    let cardIMG = document.getElementById('img-combo-'+imagen.cod_combo);
    let card = document.getElementById('card-combo-'+imagen.cod_combo);
    card.style.backgroundColor = "#ACACAC";
    cardIMG.style.filter = "grayscale(100%)";
    // let boton = doc
  }
}

//Mostrar combos
function mostrarCombo(idCombo){
  let cardIMG = document.getElementById('img-combo-'+idCombo);
  let card = document.getElementById('card-combo-'+idCombo);
  card.style.backgroundColor = "white";
  cardIMG.style.filter = "none";  
  fetch('http://localhost:8080/Administrador/combos/ocultar-combo', {
        method: 'Post',
        body: JSON.stringify({cod_combo: idCombo, visible:1})
    }).then(x =>  console.log('ok'))
    .catch(e=> {
      console.log(e);
    });
    location.reload();
}
// Imagenes productos
const getImagenes = fetch("http://localhost:8080/Administrador/productos")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      insertElement(listing);
    })  
});


function insertElement(listing){
  let html = `
      <div class="col-xs-10 col-sm-4 col-md-3 product">
        <div class="card">
            <img src="..\\public\\resources\\images\\Administrador\\${listing.src}" class="card-img-top" alt="${listing.nombre}" />
            <h3 class="card-title">${listing.nombre}</h3>
            <div class="div-checkbox-prod">
              <input type="checkbox" id="checkbox-id=${listing.cod_prod}-fin-id-${listing.nombre}" class="checkbox-prod">
              <span class="checkmark"></span>
            </div>
        </div>
      </div>
  `;
  let elemento_crear = document.getElementById('galeria-crear');
  let elemento_editar = document.getElementById('galeria-editar');
  elemento_crear.innerHTML += html;
  elemento_editar.innerHTML += html;
}  


//Otras funciones
$(function () {
  comprimirElementos("card-combo");
});
$(function () {
  comprimirElementos("card-linea");
});

function comprimirElementos(name) {
  let cards = document.getElementsByName(name);
  for (i = 0; i < cards.length; i++) {
    if (i >= 4) {
      cards[i].style.visibility = "hidden";
      cards[i].style.transition = '0.08s linear';
      cards[i].style.opacity = 0;
      cards[i].style.height = 0;
      cards[i].style.padding = 0;
      cards[i].style.margin = 0;
    }
  }
}

function descomprimir(name,boton) {
  let h5 = document.getElementById(boton);
  if(h5.innerHTML=='Ver más'){
    let cards = document.getElementsByName(name);
    for (i = 0; i < cards.length; i++) {
      cards[i].style.visibility = "visible";
      cards[i].style.opacity = 1;
      cards[i].style.height = 'auto';
      cards[i].style.transition = 'opacity 0.2s linear';
      cards[i].style.marginBottom ='30px';
    }
    h5.textContent = 'Ver menos';
  }else{
    comprimirElementos(name);
    h5.textContent = 'Ver más';
  }  
}

function llenarProductos(opcion){
  let html = "";
  let contenedor;
  let id;
  let colores = ["e5e6b5","eecabd","e1ede7"];
  if(opcion=='crear'){
    contenedor = document.getElementById('galeria-crear');
    id = "#opciones-productos-crear";
  }else{
    contenedor = document.getElementById('galeria-editar');
    id = "#opciones-productos-editar";
  }
  let boxes = contenedor.getElementsByClassName('checkbox-prod');
  for(i=0;i<boxes.length;i++){
    if(boxes[i].checked){
      let nombre=(boxes[i].id);
      let nombreStr = nombre.substring(nombre.indexOf('fin-id-')+7,nombre.length);
      let idProducto = nombre.substring(12, nombre.indexOf('-fin-id-'));
      // console.log(idProducto);
      html += `
          <div class="producto-seleccionado" id="producto-${idProducto}" style="background-color:#${colores[(i+1)%3]};">
              ${nombreStr}
          </div>
        `;
      }
  }
  $(id).html(html);
}

function limpiarProductos(){
  id = "#opciones-productos-crear";
  $(id).html("");
  id = "#opciones-productos-editar";
  $(id).html("");
  let contenedor = document.getElementById('galeria-crear');
  let boxes = contenedor.getElementsByClassName('checkbox-prod');
  for(i=0;i<boxes.length;i++){
    boxes[i].checked = false;
  }
}



function cargarDatosLinea(idLinea){
  limpiarProductos();
  const getDatosLinea = fetch("http://localhost:8080/Administrador/lineas")
    .then(response => response.json())
    .then(data => {
      const listings = data.map(listing =>{
        if(listing.cod_linea==idLinea){
          document.getElementById('guardar-linea').className = 'boton-modal '+idLinea;
          // console.log("..\\public\\resources\\images\\Administrador\\"+listing.src);
          document.getElementById('imagen-linea').src = '../public/resources/images/Administrador/'+listing.src;
          document.getElementById('input-nombre-editarLinea').value = listing.nombre;
          document.getElementById('desc-linea-editar').value= listing.descripcion;
          return
        }
      })  
  });

  const getDatosLineaProducto = fetch("http://localhost:8080/Administrador/lineas/editar-linea")
    .then(response => response.json())
    .then(data => {
      let i=0;
      let colores = ["e5e6b5","eecabd","e1ede7"];
      const listings = data.map(listing =>{
        if(listing.Linea_cod_linea==idLinea){
          llenarLineaProducto(listing.Producto_cod_prod, colores[(i+1)%3]);
        }
        i++;
      })  
  });
}

function llenarLineaProducto(codigo, color){
  let html="";
  const getImagenes = fetch("http://localhost:8080/Administrador/productos")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      if(listing.cod_prod==codigo){
        html += `
          <div class="producto-seleccionado" id="producto-${codigo}" style="background-color:#${color};">
            ${listing.nombre}
          </div>`;
        document.getElementById('opciones-productos-editar').innerHTML+=html;
        return
      }
    })  
  });
}
  
  
// Edicion de combos
function cargarDatosCombo(idCombo){
  const getDatosCombo= fetch("http://localhost:8080/Administrador/combos")
    .then(response => response.json())
    .then(data => {
      const listings = data.map(listing =>{
        if(listing.cod_combo==idCombo){
          document.getElementById('guardar-combo').className = 'boton-modal '+idCombo;
          document.getElementById('imagen-combo').src = '../public/resources/images/Administrador/'+listing.src;
          document.getElementById('input-nombre-editarCombo').value = listing.nombre;
          document.getElementById('desc-combo-editar').value= listing.descripcion;
          return
        }
      })  
  });
  const getDatosPrecioCombo = fetch("http://localhost:8080/Administrador/lineas/editar-combo")
    .then(response => response.json())
    .then(data => {
      const listings = data.map(listing =>{
        console.log(listing.Combo_cod_combo);
        if(listing.Combo_cod_combo==idCombo){
          document.getElementById('input-precio-editarCombo').value = listing.precio;
          return
        }
      })  
  });
}

function actualizarOcultar(idDato, idElemento, nombre, idMensaje){
  document.getElementById(idElemento).className = 'boton-modal '+idDato;
  let opcion = 'el combo';
  if(idMensaje=='mensaje_ocultar_linea'){
    opcion = 'la linea';
  }
  document.getElementById(idMensaje).innerText = `¿Está seguro de que quiere ocultar ${opcion} '${nombre}' ?`;
}

//lineas
function actualizarBotonEliminar(id, idElemento, nombre, idMensaje){
  document.getElementById(idElemento).className = 'boton-modal '+id;
  let opcion = 'el combo';
  if(idMensaje=='mensaje_eliminar_linea'){
    opcion = 'la linea';
  }
  document.getElementById(idMensaje).innerText = `¿Está seguro de que quiere eliminar ${opcion} '${nombre}' ? \n(*Se eliminarán todos los registros de este)`;
}
//limpiar imagen
function limpiarImagen(idElemento){
  let divImagen = document.querySelector(idElemento);
  divImagen.style.backgroundImage = "none";
}
function actualizarEditar(idContenedorImagen, idImagen){
  let divImagen = document.querySelector(idContenedorImagen);
  divImagen.style.display = "none";
  document.getElementById(idImagen).style.display = "block";
}

function ValidarTamaño(obj, imagen, inputImagen){
  var uploadFile = obj.files[0];
  var img = new Image();
  img.onload = function ()
  {
  if (this.width.toFixed(0) != this.height.toFixed(0))
  {
    alert("La imagen debe ser cuadrada");
    limpiarImagen(imagen);
    $(inputImagen).val("");
  }
  };
  img.src = URL.createObjectURL(uploadFile);
}