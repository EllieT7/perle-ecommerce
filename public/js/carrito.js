const imagenes = [
    {
        cod: 1,
        src: "..\\resources\\images\\combo3.jpg",
        alt: "Gatitos, no se puede decir más",
        nombre: "Artículo 1",
        descripcion:"............",
        precio: 10,
        cantidad: 8
    },
    {
        cod: 2,
        src: "..\\resources\\images\\combo3.jpg",
        alt: "Gatitos, no se puede decir más",
        nombre: "Artículo 1",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in arcu porta, pulvinar nunc quis, egestas dui. Suspendisse rhoncus, tellus tempor posuere porttitor, tortor lorem iaculis nunc",
        precio: 52,
        cantidad: 7
    },
    {
        cod: 3,
        src: "..\\resources\\images\\combo3.jpg",
        alt: "Gatitos, no se puede decir más",
        nombre: "Artículo 1",
        descripcion:"............",
        precio: 52,
        cantidad: 7
    },
    {
        cod: 4,
        src: "..\\resources\\images\\combo3.jpg",
        alt: "Gatitos, no se puede decir más",
        nombre: "Artículo 1",
        descripcion:"............",
        precio: 52,
        cantidad: 10
    },
    ];
    
    function elementosCarrito(imagenes) {
    let html = "";
    
    imagenes.forEach(function (imagen) {
        html += `
        <div class="card mb-3 card-producto${imagen.cod}" style="max-width: 90vw;" id="card-producto">
            <div class="row g-0">
                <div class="col-md-1 imagen">
                    <img src="${imagen.src}" style="min-width: 150px; width: 10vw;"  alt="${imagen.alt}">
                </div>
                
                <div class="col-md-8" etiqueta="contenido_producto">
                    <div class="card-body" etiqueta="nombre_desc">
                    <h4 class="card-title nombre-producto">${imagen.nombre}</h4>
                    <p class="card-text descripcion-producto">${imagen.descripcion}</p>
                    </div>
                    
                    <h5 class="h5_cantidad" >Cantidad:</h5>
                    <h5 class="h5_precio">Precio</h5>
                    
                    <div class="precio">
                        <h6 class="precio-producto" >Bs. ${imagen.precio}</h6>
                    </div>
                    <h5 class="h5_subtotal">Subtotal</h5>
                    <div class="quantity">
                        
                        <div id="box_${imagen.cod}" class="box"></div>
                        <span class="next" onclick="nextNum('box_${imagen.cod}', 'h6_${imagen.cod}',${imagen.precio})"></span>
                        <span class="prev" onclick="prevNum('box_${imagen.cod}', 'h6_${imagen.cod}',${imagen.precio})"></span>        
                    </div>

                    <script type="text/javascript">
                        inicializar('box_${imagen.cod}');
                        reestablecer(${imagen.cantidad},'box_${imagen.cod}');
                    </script>
                     
                    <div class="subtotal">
                        <h6 class="subtotal-producto"id="h6_${imagen.cod}">Bs. ${imagen.cantidad*imagen.precio}</h6>
                    </div>
                </div>
            </div>
            <button id="${imagen.cod}" class="boton_eliminar" onclick="eliminar(this.id)"><img src="../public/resources/images/otros/deleteCircle.svg" alt="eliminar"></button>
        </div>
        `;
    });
    
    $("#contenido_carrito").html(html);
    }
    
    $(function () {
    elementosCarrito(imagenes);
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
    
    function nextNum(id, id_h6, precio){
        var numbers = document.getElementById(id);
        var num = numbers.getElementsByTagName('span');
        for(i=0;i<=100;i++){
            if(num[i].style.display=='initial'){
                num[i].style.display = 'none';
                i = (i + 1) % num.length;
                num[i].style.display='initial';
                var h6 = document.getElementById(id_h6);
                h6.textContent = 'Bs. ' + (i*precio);
                break;
            }
        }
        calcularTotales();
    }
    
    function prevNum(id, id_h6, precio){
        var numbers = document.getElementById(id);
        var num = numbers.getElementsByTagName('span');
        for(i=0;i<=100;i++){
            if(num[i].style.display=='initial'){
                num[i].style.display = 'none';
                i = (i - 1 + num.length) % num.length;
                num[i].style.display='initial';
                var h6 = document.getElementById(id_h6);
                h6.textContent = 'Bs. ' + (i*precio);
                break;
            }
        }
        calcularTotales();
    }
    
    function calcularTotales(){
        var subtotales = document.getElementsByClassName('subtotal-producto');
        subtotales = limpiar(subtotales);
        var subtotalesFiltrado=[];
        for(i=0;i<subtotales.length;i++){
            var str = subtotales[i].innerHTML;
            subtotalesFiltrado[i] = parseFloat(str.substring(4,str.length),10);
        }
        let sumaTotal = subtotalesFiltrado.reduce((a, b) => a + b, 0);
        let subtotal = document.getElementById('valor-subtotal');
        let total = document.getElementById('valor-total');
        let envio = document.getElementById('valor-envio');
        var str = envio.innerHTML;
        let costoEnvio = parseFloat(str.substring(16,(str.length)-4),10);
        subtotal.textContent = 'Subtotal: '+sumaTotal+' Bs.';
        total.textContent = 'Total: '+ (sumaTotal+costoEnvio)+' Bs.';
    }
    
    function limpiar(lista){
        let listaTotal = [];
        let j=0;
        for(i=0;i<lista.length;i++){
            if(lista[i].style.display != 'none'){
                listaTotal[j] = lista[i];
                j++;
            }
        }
        return listaTotal;
    }
    
    function actualizarEnvio(dato){
        let envio = document.getElementById('valor-envio');
        let costo = 0;
        if(dato=='La_Paz'){
            costo = 25;
        }
        envio.textContent = 'Costo de envío: '+costo+' Bs.';
        calcularTotales();
    }
    
    function eliminar(dato){
        let card = document.getElementsByClassName('card-producto'+dato);
        let h6 = document.getElementById('h6_'+dato);
        card[0].style.display = 'none';
        h6.style.display = 'none';
        calcularTotales();
    }