const imagenesProductos = fetch("http://localhost:8080/Administrador/productos")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      if(listing.visible){
        renderizarGaleria(listing);
      }
    })
});
const imagenesCombos = fetch("http://localhost:8080/Administrador/combos")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      if(listing.visible){
        renderizarGaleria(listing);
      }
    })
});

function renderizarGaleria(producto) {
  let html = `
      <div class="col-xs-10 col-sm-4 col-md-3 product">
        <div class="card">
            <img src="..\\public\\resources\\images\\Administrador\\${producto.src}" class="card-img-top" alt="${producto.nombre}" />
            <h3 class="card-title">${producto.nombre}</h3>
            <p class="card-text">${producto.precio} Bs.</p>
        </div>
      </div>
      `;
  document.getElementById('galeria').innerHTML+=html;
}

function cambiarColor(idElemento, estado){
  let elemento = document.getElementById(idElemento);
  if(estado=='inactivo'){
      elemento.innerHTML+='*';
      elemento.style.color="#accc92";
      elemento.className = 'activo';
      elemento.style.fontWeight = '550';
  }else{
      let texto = elemento.innerHTML;
      elemento.innerHTML = texto.substring(0, texto.length-1);
      elemento.style.color="#616161";
      elemento.className = 'inactivo';
      elemento.style.fontWeight = '400';
  }
}

function mostrarTodo(){
  
}
  
