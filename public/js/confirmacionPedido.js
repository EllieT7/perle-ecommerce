const listaProductos = [
    {
        cod: 1,
        nombre: "Artículo 1",
        precio: 10,
        cantidad: 8
    },
    {
        cod: 2,
        nombre: "Artículo 2",
        precio: 52,
        cantidad: 7
    },
    {
        cod: 3,
        nombre: "Artículo 3",
        precio: 52,
        cantidad: 7
    },
    {
        cod: 4,
        nombre: "Artículo 3",
        precio: 52,
        cantidad: 10
    },
];

function actualizarEnvio(dato){
    let envio = document.getElementById('dato-envio');
    let costo = 0;
    switch(dato){
        case 'La Paz':
            costo=25;
            break;
        case 'Beni':
            costo=35;
            break;
        case 'Cochabamba':
            costo=20;
            break;
        case 'Chuquisaca':
            costo=15;
            break;
        case 'Oruro':
            costo=8;
            break;
        case 'Pando':
            costo=15;
            break;
        case 'Santa Cruz':
            costo=30;
            break;
        case 'Tarija':
            costo=12;
            break;
        default:
            costo=25;
            break;
    }
    envio.textContent = costo+' Bs.';
    calcularTotal();
}

function cargarDatosPedido(listaProductos){
    let html = "";
    listaProductos.forEach(function (producto) {
        let total = producto.cantidad * producto.precio;
        html += `
        <tr>
        <td style="width: 85%">${producto.cantidad}´´´${producto.nombre}</td>
        <td class="totales-pedido">${total} Bs.</td>
        </tr>
        `;
    });
    $("#tabla-contenido").html(html);
    calcularSubtotal();
}

$(function () {
    cargarDatosPedido(listaProductos);
});
    
function calcularSubtotal(){
    var subtotalesFiltrado=[];
    let subtotales = document.getElementsByClassName('totales-pedido')
    for(i=0;i<subtotales.length;i++){
        var str = subtotales[i].innerHTML;
        subtotalesFiltrado[i] = parseFloat(str.substring(0,str.length-4),10);
    }
    let sumaTotal = subtotalesFiltrado.reduce((a, b) => a + b, 0);
    document.getElementById('dato-subtotal').innerText = sumaTotal+' Bs.';
}

function calcularTotal(){
    let datoSubtotal = document.getElementById('dato-subtotal').innerText;
    let costoEnvio = document.getElementById('dato-envio').innerText;
    datoSubtotal = parseFloat(datoSubtotal.substring(0,datoSubtotal.length-4),10);
    costoEnvio = parseFloat(costoEnvio.substring(0,costoEnvio.length-4),10);
    let total = datoSubtotal + costoEnvio;
    document.getElementById('dato-total').innerText = total + ' Bs.';
}


function Cliente(){ // funcion para la comparar que las contraseñas sean iguales
  //  if(document.exampleRadios.radio1.checked){
     
    if(document.getElementById('radio1').checked && document.getElementById('ptm').value==2){
        let nombre = document.getElementById('input-nombre').value;
        let celular = document.getElementById('input-celular').value;
        let correo = document.getElementById('input-correo').value;
        let fecha_cumple = document.getElementById('input-cumple').value;
        let ci = document.getElementById('input-CI').value;
        let direccion = document.getElementById('input-direccion').value;
        let metodo = 1;
        let departamento = document.getElementById('ptm').value;
        let envio = document.getElementById('dato-envio').innerHTML;
        envio = envio.substring(0,envio.length-4);
        console.log(envio);
        console.log(departamento);
            
        let campos = [nombre,celular,correo,fecha_cumple];   
        if(validar(campos)){     
        let transaction = {nombre:nombre,celular:celular, correo:correo,fecha_cumple:fecha_cumple,ci:ci,direccion:direccion,Departamento_cod_dpto:departamento,metodo:metodo,envio:envio};
        let transactionJson = JSON.stringify(transaction);
        console.log(transactionJson);
        fetch('http://localhost:8080/Cliente', {
            method: 'post',
            body: transactionJson
        }).then(x => console.log('Registrado'))
        .catch(e=> {
            console.log(e);
        });
        limpiar();
        }else{
           alert('Debe llenar todos los campos');
        }
        
    }
    else{
     //   alert('La entrega personal solo es valida para Sucre');
    //}

    if(document.getElementById('radio2').checked){
        let nombre = document.getElementById('input-nombre').value;
        let celular = document.getElementById('input-celular').value;
        let correo = document.getElementById('input-correo').value;
        let fecha_cumple = document.getElementById('input-cumple').value;
        let ci = document.getElementById('input-CI').value;
        let direccion = document.getElementById('input-direccion').value;
        let metodo = 2;
        let departamento = document.getElementById('ptm').value;
        let envio = document.getElementById('dato-envio').innerHTML;
        envio = envio.substring(0,envio.length-4);
        console.log(envio);
        console.log(departamento);
        let campos = [];
        let vcurrier = false;
        if(document.getElementById('currier').checked){
            campos = [nombre,celular,correo,fecha_cumple,ci,direccion];   
            vcurrier = true;
        }
        else{
            campos = [nombre,celular,correo,fecha_cumple,ci];   
            vcurrier = false;
        }
        if(validar(campos)){     
        let transaction = {nombre:nombre,celular:celular, correo:correo,fecha_cumple:fecha_cumple,ci:ci,direccion:direccion,Departamento_cod_dpto:departamento,metodo:metodo,envio:envio,vcurrier:vcurrier};
        let transactionJson = JSON.stringify(transaction);
        console.log(transactionJson);
        fetch('http://localhost:8080/Cliente', {
            method: 'post',
            body: transactionJson
        }).then(x => console.log('Registrado'))
        .catch(e=> {
            console.log(e);
        });
        limpiar();

        }else{
            alert('Debe llenar todos los campos');
        }
        
    }
    else{
    if(document.getElementById('radio3').checked){
        let nombre = document.getElementById('input-nombre').value;
        let celular = document.getElementById('input-celular').value;
        let correo = document.getElementById('input-correo').value;
        let fecha_cumple = document.getElementById('input-cumple').value;
        let ci = document.getElementById('input-CI1').value;
        let direccion = document.getElementById('input-direccion1').value;
        let metodo = 3;
        let departamento = document.getElementById('ptm').value;
        let envio = document.getElementById('dato-envio').innerHTML;
        envio = envio.substring(0,envio.length-4);
        console.log(envio);
        console.log(departamento);
        let campos = [];
        let vcurrier = false;
        if(document.getElementById('currier1').checked){
            campos = [nombre,celular,correo,fecha_cumple,ci,direccion];   
           vcurrier = true;
        }
        else{
            campos = [nombre,celular,correo,fecha_cumple,ci];   
            vcurrier = false;
        }
        if(validar(campos)){     
        let transaction = {nombre:nombre,celular:celular, correo:correo,fecha_cumple:fecha_cumple,ci:ci,direccion:direccion,Departamento_cod_dpto:departamento,metodo:metodo,envio:envio,vcurrier:vcurrier};
        let transactionJson = JSON.stringify(transaction);
        console.log(transactionJson);
        fetch('http://localhost:8080/Cliente', {
            method: 'post',
            body: transactionJson
        }).then(x => console.log('Registrado'))
        .catch(e=> {
            console.log(e);
        });
        limpiar();

        }else{
            alert('Debe llenar todos los campos');
        }
    }
    else{
        alert('La entrega personal solo es valida para Sucre');
    }


    }
    }
  
}


/*Validar que el campo no este vacío*/
function validar (campo){
    let flag = true;
    for (i=0; i<campo.length; i++){
        if (campo[i] == ""){
            flag = false;
            break;
        }
    }
    return flag;
};
function limpiar(){
    let nombre = document.getElementById('input-nombre').value="";
    let celular = document.getElementById('input-celular').value="";
    let correo = document.getElementById('input-correo').value="";
    let fecha_cumple = document.getElementById('input-cumple').value="";
    let ci = document.getElementById('input-CI').value="";
    let direccion = document.getElementById('input-direccion').value="";
}
