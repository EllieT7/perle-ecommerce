
let n = 0;
function desplegar () {
    if (n == 0){
        document.getElementById('botones').classList.add('botones-activar');
        document.getElementById('abajo').src="../public/resources/images/pedidos/arriba.png";
        n = 1;
    } else {
        document.getElementById('botones').classList.remove('botones-activar');
        document.getElementById('abajo').src="../public/resources/images/pedidos/abajo.png";
        n = 0;
    }
}

function activarOpcion (id, idf) {
    document.getElementById(id).classList.add('configuracion-activo');
    document.getElementById(idf).classList.remove('configuracion-activo');
}

const pedidosNuevos = fetch("http://localhost:8080/Administrador/pedidos/nuevos")
  .then(response => response.json())
  .then(data => {
    const listings = data.map(listing =>{
      cargarPedidosNuevos(listing);
    })  
});

function cargarPedidosNuevos(pedido) {
   
    let html = `
            <div class="accordion-item${pedido.nro_pedido}" id="accordion-item${pedido.nro_pedido}">
                <h2 class="accordion-header" id="flush-heading${pedido.nro_pedido}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${pedido.nro_pedido}" aria-expanded="false" aria-controls="flush-collapse${pedido.nro_pedido}">
                        Pedido ${pedido.nro_pedido}   Fecha del pedido ${pedido.fecha_pedido}
                    </button>
                </h2>
                <div id="flush-collapse${pedido.nro_pedido}" class="accordion-collapse collapse" aria-labelledby="flush-heading${pedido.nro_pedido}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="informacion${pedido.nro_pedido}">
                            Información del pedido <br>
                            <t>Fecha aproximada de entrega:  ${pedido.fecha_aproximada_entrega} <br>
                            <t>Nombre del cliente: ${pedido_nombre} <br>
                            <t>Teléfono cliente: ${pedido.telefono} <br>
                            <t>Departamento: ${pedido.depto} <br>
                            <t>Costo del envío: ${pedido.precio_envio} <br>`
                            fetch("http://localhost:8080/Administrador/pedidos/productos")
                            .then(response => response.json())
                                .then(data => {
                                const listings = data.map(listing =>{
                                    html += llenarPedidoProductos(listing, pedido.nro_pedido);
                                })  
                            });
                            fetch("http://localhost:8080/Administrador/pedidos/combos")
                            .then(response => response.json())
                                .then(data => {
                                const listings = data.map(listing =>{
                                    html += llenarPedidoCombos(listing, pedido.nro_pedido);
                                })  
                            });
                            html += `
                            <t>Metido de pago: ${pedido.descripcion}
                        </div>
                        <div class="btn_rechazar_admi${pedido.nro_pedido}">
                            <button type="button" class="rechazar${pedido.nro_pedido}" onclick="updateEstado('${pedido.nro_pedido}', 1)">
                                Rechazar<img src="../public/resources/images/pedidos/dislike.svg" alt="add" width="15px"/>
                            </button>
                        </div>
                        <div class="btn_aceptar_admi${pedido.nro_pedido}">
                            <button type="button" class="aceptar${pedido.nro_pedido}" onclick="updateEstado('${pedido.nro_pedido}', 0)">
                                Aceptar<img src="../public/resources/images/pedidos/like.svg" alt="add" width="15px"/>
                            </button>
                        </div>
                    </div>
                </div>
                <style type="text/css">
                    .btn_rechazar_admi${pedido.nro_pedido}, btn_aceptar_admi${pedido.nro_pedido}{
                        display: flex;
                        justify-content: right;
                    }
                    .rechazar${pedido.nro_pedido} {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-width: 0px;
                        background-color: #eecabd;
                        color: white;
                        width: 6vw;
                        min-width: 200px;
                        border-radius: 3px;
                        font-size: 90%;
                        font-family: 'Urbanist', sans-serif;
                        padding: 1% 1%;
                    }
                    .aceptar${pedido.nro_pedido} {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-width: 0px;
                        background: #9de093;
                        color: white;
                        width: 6vw;
                        min-width: 200px;
                        border-radius: 3px;
                        font-size: 90%;
                        font-family: 'Urbanist', sans-serif;
                        padding: 1% 1%;
                    } 
                    .rechazar${pedido.nro_pedido} img, aceptar${pedido.nro_pedido} img {
                        margin-left: 4%;
                    }
                    .rechazar${pedido.nro_pedido}:hover {
                        background: palevioletred;
                    }
                    .aceptar${pedido.nro_pedido}: {
                        background: green;
                    }
                    .accordion-item${pedido.nro_pedido} {
                        border-color: #d4d7d9;
                        border-style: solid;
                        border-width: 0.2px;
                        margin-bottom: 1%;
                    }
                </style>
            </div>
        `;
    let elemento = document.getElementById('pedidos');
    elemento.innerHTML += html;
}

function cargarAceptados () {
    let div = document.getElementById('pedidos');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    fetch("http://localhost:8080/Administrador/pedidos/aceptados")
    .then(response => response.json())
    .then(data => {
        const listings = data.map(listing =>{
        cargarPedidosAR(listing, 0);
    })  
})
}

function cargarRechazados () {
    let div = document.getElementById('pedidos');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    fetch("http://localhost:8080/Administrador/pedidos/rechazados")
    .then(response => response.json())
    .then(data => {
        const listings = data.map(listing =>{
        cargarPedidosAR(listing, 1);
    })  
})
}

function cargarPedidosAR(pedido, estadoCambio) {
    let html = `
            <div class="accordion-item${pedido.nro_pedido}" id="accordion-item${pedido.nro_pedido}">
                <h2 class="accordion-header" id="flush-heading${pedido.nro_pedido}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${pedido.nro_pedido}" aria-expanded="false" aria-controls="flush-collapse${pedido.nro_pedido}">
                        Pedido ${pedido.nro_pedido}   Fecha del pedido ${pedido.fecha_pedido}
                    </button>
                </h2>
                <div id="flush-collapse${pedido.nro_pedido}" class="accordion-collapse collapse" aria-labelledby="flush-heading${pedido.nro_pedido}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="informacion${pedido.nro_pedido}">
                            Información del pedido <br>
                            <t>Fecha aproximada de entrega:  ${pedido.fecha_aproximada_entrega} <br>
                            <t>Nombre del cliente: ${pedido_nombre} <br>
                            <t>Teléfono cliente: ${pedido.telefono} <br>
                            <t>Departamento: ${pedido.depto} <br>
                            <t>Costo del envío: ${pedido.precio_envio} <br>`
                            fetch("http://localhost:8080/Administrador/pedidos/productos")
                            .then(response => response.json())
                                .then(data => {
                                const listings = data.map(listing =>{
                                    html += llenarPedidoProductos(listing, pedido.nro_pedido);
                                })  
                            });
                            fetch("http://localhost:8080/Administrador/pedidos/combos")
                            .then(response => response.json())
                                .then(data => {
                                const listings = data.map(listing =>{
                                    html += llenarPedidoCombos(listing, pedido.nro_pedido);
                                })  
                            });
                            html += `
                            <t>Metido de pago: ${pedido.descripcion}
                        </div>
                        <div class="btn_cambiar_admi${pedido.nro_pedido}">
                            <button type="button" class="cambiar${pedido.nro_pedido}" onclick="updateEstado('${pedido.nro_pedido}', ${estadoCambio})">
                                Cambiar<img src="../public/resources/images/pedidos/dislike.svg" alt="add" width="15px"/>
                            </button>
                        </div>
                    </div>
                </div>
                <style type="text/css">
                    .btn_cambiar_admi${pedido.nro_pedido} {
                        display: flex;
                        justify-content: right;
                    }
                    .cambiar${pedido.nro_pedido} {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-width: 0px;
                        background-color: #eecabd;
                        color: white;
                        width: 6vw;
                        min-width: 200px;
                        border-radius: 3px;
                        font-size: 90%;
                        font-family: 'Urbanist', sans-serif;
                        padding: 1% 1%;
                    }
                    .cambiar${pedido.nro_pedido} img {
                        margin-left: 4%;
                    }
                    .cambiar${pedido.nro_pedido}:hover {
                        background: palevioletred;
                    }
                    .accordion-item${pedido.nro_pedido} {
                        border-color: #d4d7d9;
                        border-style: solid;
                        border-width: 0.2px;
                        margin-bottom: 1%;
                    }
                </style>
            </div>
        `;
    let elemento = document.getElementById('pedidos');
    elemento.innerHTML += html;
}

function llenarPedidoProductos (productos, nro_pedido){
    let lleno = ``;
    if (productos.Pedido_nro_pedido == nro_pedido){
        lleno = `
            <t>Producto: ${productos.nombre}<br>
            <t>Cantidad: ${productos.cantidad}<br>
            <t>Precio por unidad: ${productos.precio}<br>
        `;
    }
    return lleno;
}
function llenarPedidoCombos (combos, nro_pedido){
    let lleno = ``;
    if (combos.Pedido_nro_pedido == nro_pedido){
        lleno = `
            <t>Producto: ${combos.nombre}<br>
            <t>Cantidad: ${combos.cantidad}<br>
            <t>Precio por unidad: ${combos.precio}<br>
        `;
    }
    return lleno;
}

function updateEstado (num_pedido, estado) {
    let transaccion = {nro_pedido: num_pedido, aceptado: estado};
    let transaccionJSON = JSON.stringify(transaccion);
    console.log(transaccionJSON);
    var y = document.getElementById('pedidos');
    var x = document.getElementById('accordion-item'+num_pedido+'');
    x.removeChild (y);
    fetch('http://localhost:8080/Administrador/pedidos/editar-estado', {
        method: 'Post',
        body: transaccionJSON
    }).then(x => console.log('ok'))
        .catch(e=> {
        console.log(e);
    });
}