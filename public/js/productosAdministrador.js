//------------------------------------------------------------------------------------------------//
// Listas de productos - fetch
const imagenes = fetch("http://localhost:8080/Administrador/productos")
.then(response => response.json())
.then(data=> {
    const products = data.map(product => {
        insertElementProduct(product);
    })
});

// Listas de productos - html
function insertElementProduct(imagen) {
let opcion = `<button type="button" id="ocultar_card${imagen.cod_prod}" class="boton-ocultar" data-bs-toggle="modal" data-bs-target="#ocultarProducto" onclick="actualizarOcultar(${imagen.cod_prod}, 'boton-ocultar-prod','${imagen.nombre}', 'mensaje_ocultar_prod')">
<img id="hideCard${imagen.cod_prod}" src="../public/resources/images/iconos/ojo_rayado.svg" alt="ocultar" width="16px"/>
</button>`;

let botonMostrar = `<button type="button" id="ocultar_card${imagen.cod_prod}" class="boton-ocultar" onclick="mostrarProducto(${imagen.cod_prod})">
<img id="hideCard${imagen.cod_prod}" src="../public/resources/images/iconos/ojo_rayado.svg" alt="ocultar" width="16px"/>
</button>`;
if(!imagen.visible){
    opcion = botonMostrar;    
}
let html = `
    <div class="col-xs-10 col-sm-4 col-md-3 product">
        <div class="card" name="card-producto" id="card-prod-${imagen.cod_prod}">
            <img src="../public/resources/images/Administrador/${imagen.src}" class="card-img-top" alt="imagen${imagen.cod_prod}" id="img-prod-${imagen.cod_prod}"/>
            <h3 class="card-title">${imagen.nombre}</h3>
            <p class="card-text">${imagen.precio} Bs.</p>
            <button type="button" id="editar_card${imagen.cod_prod}" class="boton-editar" data-bs-toggle="modal" data-bs-target="#editProduct" onclick="cargarDatosProducto(${imagen.cod_prod})">
                <img id="editCard${imagen.cod_prod}" src="../public/resources/images/otrasConfiguraciones/editar.svg" alt="editar" width="16px"/>
            </button>
            <button type="button" id="eliminar_card${imagen.cod_prod}" class="boton-eliminar" data-bs-toggle="modal" data-bs-target="#eliminarProducto" onclick="actualizarBotonEliminar(${imagen.cod_prod}, 'eliminar-producto','${imagen.nombre}','mensaje-eliminar-prod')">
                <img id="deleteCard${imagen.cod_prod}" src="../public/resources/images/otrasConfiguraciones/basurero_blanco.svg" alt="editar" width="16px"/>
            </button>
            ${opcion}
        </div>
    </div>
    `;
    let elemento = document.getElementById('galeria');
    elemento.innerHTML += html;
    if(!imagen.visible){
        let cardIMG = document.getElementById('img-prod-'+imagen.cod_prod);
        let card = document.getElementById('card-prod-'+imagen.cod_prod);
        card.style.backgroundColor = "#ACACAC";
        cardIMG.style.filter = "grayscale(100%)";
    }
}
//Funcion mostrarProd
function mostrarProducto(idProducto){
    let cardIMG = document.getElementById('img-prod-'+idProducto);
    let card = document.getElementById('card-prod-'+idProducto);
    card.style.backgroundColor = "white";
    cardIMG.style.filter = "none";  
    fetch('http://localhost:8080/Administrador/productos/ocultar-producto', {
          method: 'Post',
          body: JSON.stringify({cod_prod: idProducto, visible:1})
      }).then(x =>  console.log('ok'))
      .catch(e=> {
        console.log(e);
      });
      location.reload();
  }
//Funcion actualizarOcultar
function actualizarOcultar(idDato, idElemento, nombre, idMensaje){
    document.getElementById(idElemento).className = 'boton-modal-ocultar '+idDato;
    document.getElementById(idMensaje).innerText = `¿Está seguro de que quiere ocultar el producto '${nombre}' ?`;
}
//------------------------------------------------------------------------------------------------//
// Lineas de productos - fetch
const lineas = fetch("http://localhost:8080/Administrador/lineas")
.then(response => response.json())
.then(data=> {
    const lines = data.map(line => {
        insertLinesProduct(line);
        insertLinesProductEdit(line);
    })
});

// Lineas de productos - html
function insertLinesProduct(line) {
    let html = `
        <option value="${line.cod_linea}">${line.nombre}</option>
    `;
    let elemento = document.getElementById('lineas_producto');
    elemento.innerHTML += html;
}

// Lineas de productos editar - html
function insertLinesProductEdit(line) {
    let html = `
        <option value="${line.cod_linea}">${line.nombre}</option>
    `;
    let elemento = document.getElementById('lineas_producto-editar');
    elemento.innerHTML += html;
}

//------------------------------------------------------------------------------------------------//
// Tipos de productos - fetch
const types = fetch("http://localhost:8080/Administrador/productos/tipos")
.then(response => response.json())
.then(data=> {
    const types = data.map(type => {
        insertTypesProduct(type);
        insertTypesProductEdit(type);
    })
});

// Tipos de productos - html
function insertTypesProduct(type) {
    
        let html = `
            <option value="${type.cod_tipo}">${type.descripcion}</option>
        `;
        let elemento = document.getElementById('tipo_producto');
        elemento.innerHTML += html;
    
    
}

// Tipos de productos editar - html
function insertTypesProductEdit(type) {
   
        let html = `
        <option value="${type.cod_tipo}" id="opcion-${type.cod_tipo}">${type.descripcion}</option>
        `;
        let elemento = document.getElementById('tipo_producto-editar');
        elemento.innerHTML += html;
    
}

//------------------------------------------------------------------------------------------------//
// Desplegables - seleccion multiple.
$(document).ready(function(){
    $('.multi_select_lineas').selectpicker();
})
$(document).ready(function(){
    $('.multi_select_lineas-editar').selectpicker();
})

//------------------------------------------------------------------------------------------------//
// Cargar al formulario los datos de producto.
function cargarDatosProducto(idProducto){
    const getDatosProducto = fetch("http://localhost:8080/Administrador/productos")
      .then(response => response.json())
      .then(data => {
        const listings = data.map(listing =>{
            if(listing.cod_prod == idProducto){
                document.getElementById('guardar-producto').className = 'btn_agregar-editar '+idProducto;
                document.getElementById('nombre_producto-editar').value=listing.nombre;
                document.getElementById('tipo_producto-editar').value=listing.tipo_producto_cod_tipo;
                document.getElementById('precio_producto-editar').value=listing.precio;
                document.getElementById('descripcion_producto-editar').value=listing.descripcion;
                document.getElementById('tiempo_producto-editar').value=listing.tiempo_espera;
                document.getElementById('imagen-producto').src='../public/resources/images/Administrador/'+listing.src;
                return
          }
        })  
    });
    const getDatosLineas = fetch("http://localhost:8080/Administrador/productos/linea-producto")
      .then(response => response.json())
      .then(data => {
        const listings = data.map(listing =>{
          if(listing.Producto_cod_prod == idProducto){
            return
          }
        })  
    });
  }
  //Eliminar producto --> actualizar
  function actualizarBotonEliminar(id, idElemento, nombre, idMensaje){
    document.getElementById(idElemento).className = 'boton-modal-eliminar '+id;
    document.getElementById(idMensaje).innerText = `¿Está seguro de que quiere eliminar el producto '${nombre}' ? \n(*Se eliminarán todos los registros de este)`;
  }

  function limpiarImagen(idElemento){
    let divImagen = document.querySelector(idElemento);
    divImagen.style.backgroundImage = "none";
  }
  function actualizarEditar(idContenedorImagen, idImagen){
    let divImagen = document.querySelector(idContenedorImagen);
    divImagen.style.display = "none";
    document.getElementById(idImagen).style.display = "block";
  }