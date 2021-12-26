const imagen = {
    src: "..\\public\\resources\\images\\Administrador\\combo1.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Cajita | La noche estrellada",
    descripcion: "La noche estrellada es un óleo sobre lienzo del pintor posimpresionista neerlandés Vincent van Gogh . Pintado en junio de 1889, representa la vista desde la ventana orientada al este de su habitación de asilo en Saint-Rémy-de-Provence, justo antes del amanecer, con la adición de un pueblo imaginario.",
    tiempo: "2 semanas",
    precio: 52,
};

function imagenProducto(imagen) {
    let html = "";

    html += `
        <div class = "imagen_producto">
            <img src="${imagen.src}" alt="${imagen.alt}"/>
        </div>
        <div class = "informacion_producto">
            <h2><center>${imagen.nombre}</center></h2>
            <p><center>${imagen.descripcion}</center></p>
            <p><center>Tiempo de espera aproximado: ${imagen.tiempo}</center></p>
            <p><center>Precio: ${imagen.precio} Bs.</center></p>
            <center><button type="button" class="agregar_carrito">
                Agregar a carrito<img src="../public/resources/images/otrasConfiguraciones/agregar.svg" alt="add" width="15px"/>
            </button></center>
        </div>

        <div class="quantity">      
        <div id="box_${imagen.cod}" class="box"></div>
            <span class="next" onclick="nextNum('box_${imagen.cod}')"></span>
            <span class="prev" onclick="prevNum('box_${imagen.cod}')"></span>        
        </div>
        <script type="text/javascript">
            inicializar('box_${imagen.cod}');
            reestablecer(1,'box_${imagen.cod}');
        </script> 

       
    `;
    

$("#producto_informacion").html(html);
}
  
$(function () {
imagenProducto(imagen);
});

const imagenes = [
{
    src: "..\\public\\resources\\images\\Administrador\\combo3.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 1",
    precio: 52,
},
{
    src: "..\\public\\resources\\images\\Administrador\\combo2.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 2",
    precio: 82,
},

{
    src: "..\\public\\resources\\images\\Administrador\\linea1.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 1",
    precio: 52,
},
{
    src: "..\\public\\resources\\images\\Administrador\\linea2.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 1",
    precio: 52,
},
{
    src: "..\\public\\resources\\images\\Administrador\\linea3.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 1",
    precio: 52,
},
{
    src: "..\\public\\resources\\images\\Administrador\\producto1.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 1",
    precio: 52,
},
{
    src: "..\\public\\resources\\images\\Administrador\\combo3.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 1",
    precio: 52,
},
{
    src: "..\\public\\resources\\images\\Administrador\\combo2.jpg",
    alt: "Gatitos, no se puede decir más",
    nombre: "Artículo 2",
    precio: 82,
},
];
    
function renderizarGaleria(imagenes) {
let html = "";

imagenes.forEach(function (imagen) {
    html += `
        <div class="col-xs-10 col-sm-4 col-md-3 product">
            <div class="card">
                <img src="${imagen.src}" class="card-img-top" alt="${imagen.alt}" />
                <h3 class="card-title">${imagen.nombre}</h3>
                <p class="card-text">${imagen.precio} Bs.</p>
            </div>
        </div>

    `;
});

$("#galeria").html(html);
}

$(function () {
    renderizarGaleria(imagenes);
});


function inicializar(idBox){
    var numbers = document.getElementById(idBox);
    for(i=0;i<=100;i++){
        var span = document.createElement('span');
        span.textContent = i;
        numbers.appendChild(span);
    }
}

function reestablecer(index,idBox){
    var numbers = document.getElementById(idBox);
    var num1 = numbers.getElementsByTagName('span');
    for(i=0;i<=100;i++){
        if(index==i){
            num1[i].style.display = 'initial';
        }else{
            num1[i].style.display = 'none';
        }
    }
    
}   

function nextNum(id){
    var numbers = document.getElementById(id);
    var num = numbers.getElementsByTagName('span');
    for(i=0;i<=100;i++){
        if(num[i].style.display=='initial'){
            num[i].style.display = 'none';
            i = (i + 1) % num.length;
            num[i].style.display='initial';
            break;
        }
    }
}

function prevNum(id){
    var numbers = document.getElementById(id);
    var num = numbers.getElementsByTagName('span');
    for(i=0;i<=100;i++){
        if(num[i].style.display=='initial'){
            num[i].style.display = 'none';
            i = (i - 1 + num.length) % num.length;
            num[i].style.display='initial';
            break;
        }
    }
}