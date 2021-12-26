
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
const administradores = [
    {
        codigo: 101,
        user_admi: 'Naomi',
        nombre_admi: 'Naomi Tacachira',
        correo_admi: 'naomi.tacachira@gmail.com',
        tipo_Admi: 'Normal'
    },
    {
        codigo: 102,
        user_admi: 'Naomi',
        nombre_admi: 'Naomi Tacachira',
        correo_admi: 'naomi.tacachira@gmail.com',
        tipo_Admi: 'Normal'
    },
    {
        codigo: 103,
        user_admi: 'Naomi',
        nombre_admi: 'Naomi Tacachira',
        correo_admi: 'naomi.tacachira@gmail.com',
        tipo_Admi: 'Normal'
    },
];
  
function renderizarAdministradores(administradores) {
    let html = '';
    
    administradores.forEach(function(admi){
        html += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${admi.codigo}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${admi.codigo}" aria-expanded="false" aria-controls="flush-collapse${admi.codigo}">
                        Registro de ${admi.nombre_admi}
                    </button>
                </h2>
                <div id="flush-collapse${admi.codigo}" class="accordion-collapse collapse" aria-labelledby="flush-heading${admi.codigo}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        Información del administrador <br>
                        <t>Código:  ${admi.codigo} <br>
                        <t>Nombre de usuario:  ${admi.user_admi} <br>
                        <t> Correo electrónico:  ${admi.correo_admi} <br>
                        Tipo de administrador:  ${admi.tipo_Admi}
                    </div>
                </div>
            </div>
        `;
    });
    $('#pedidos').html(html);
}
  
$(function() {
    renderizarAdministradores(administradores);
});