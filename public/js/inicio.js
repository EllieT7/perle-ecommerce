//Conexion BDD
//lineas
const imagenesLineas = fetch("http://localhost:8080/Administrador/lineas")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      if(listing.visible){
        renderizarGaleria(listing, 'box-lineas');
      }
    })  
});
//combos
const imagenesCombos = fetch("http://localhost:8080/Administrador/combos")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      if(listing.visible){
        renderizarGaleria(listing, 'box-combos');
      }
    })  
});
//productos --> solo 5
const imagenesProductos = fetch("http://localhost:8080/Administrador/productos")
  .then(response => response.json())
  .then(data => {
    let i = 1;
    const listings = data.map(listing =>{
      if(listing.visible){
        if(i<=5){
          renderizarGaleria(listing, 'box-productos');
          i++;
        }
      }
    })
    let html=`
      <div class="col-sm-6 col-md-4">
          <div class="lightbox">
              <a href = "../html/productos.html">Ver más</a>
          </div>
      </div>
      `;
    document.getElementById('box-productos').innerHTML+=html;
});

//al presionar la imagen --> a href a la ruta especifica
function renderizarGaleria(imagen, elemento) {
  let html = "";
  if(elemento=='box-lineas'){
      html += `   
      <div class="col-sm-6 col-md-4">
          <div class="lightbox">
              <a href="/lineas/${imagen.nombre}-id=${imagen.cod_linea}"><img src=\\resources\\images\\Administrador\\${imagen.src}></a>
              <div class="contenido">
                  <h3 class="h3-nombre"> ${imagen.nombre}</h3>
                  <div style = "width = 500px">
                  <p class="h3-secundario"> ${imagen.descripcion}</p>
                  </div>
              </div>
          </div>
      </div>
      `;
  }else{
    html += `  
    <div class="col-sm-6 col-md-4">
        <div class="lightbox">
            <img src=..\\resources\\images\\Administrador\\${imagen.src}>
            <div class="contenido">
                <h3 class="h3-nombre"> ${imagen.nombre}</h3>
                <h3 class="h3-secundario"> Precio: ${imagen.precio} Bs.</h3>
            </div>
        </div>
    </div>
    `;
  }
  document.getElementById(elemento).innerHTML+=html;
}

//Informacion de contacto
const infoContacto = fetch("http://localhost:8080/Administrador/contacto")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      let idElemento;
      switch (listing.nombre) {
        case 'Instagram':
          idElemento='enlace-ig';
          break;
        case 'Facebook':
          idElemento='enlace-fb';
          break;
        case 'Whatsapp':
          idElemento = 'enlace-wsp';
          break;
        case 'TikTok':
          idElemento = 'enlace-tiktok';
          break;
        case 'Correo':
          idElemento = 'enlace-correo';
          break;
      }
      if(listing.nombre == 'Correo'){
        document.getElementById(idElemento).href = 'mailto:'+listing.enlace;
      }
      document.getElementById(idElemento).href = listing.enlace;
      if(listing.nombre!='TikTok'){
        document.getElementById(idElemento+'2').href = listing.enlace;
        if(listing.nombre=='Whatsapp'|| listing.nombre=='Instagram'){
          document.getElementById(idElemento+'3').href = listing.enlace;
        }
      }
    })  
});
  


  
//Carrusel
var scrollPerClick = 600;
var scrollAmount = 0;

function sliderScrollLeft(id){
    let box = document.getElementById(id);
    box.scrollTo({
        top:0,
        left: (scrollAmount -= scrollPerClick),
        behavior: 'smooth'
    });
    if(scrollAmount < 0){
        scrollAmount = 0;
    }
}

function sliderScrollRight(id){
    let box = document.getElementById(id);
    if(scrollAmount <= box.scrollWidth - box.clientWidth){
        box.scrollTo({
            top:0,
            left: (scrollAmount += scrollPerClick),
            behavior: 'smooth'
        })
    }
}