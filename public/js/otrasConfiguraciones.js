//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");


/*Llenar todos los datos en los campos*/
window.onload = function llenarDatos(){
    fetch('http://localhost:8080/datos', {// solicitamos el password del usuario para comparar sera un get

    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        .then(data=>{ 
        const listings=data.map(listing=>{ // Convertimos el objeto en un arreglo para hacer la comparacion
        document.getElementById("user").value=listing.user;
        document.getElementById("name").value=listing.nombre;
        document.getElementById("correo").value=listing.correo;
    })
    })
    .catch(e=> {
     console.log(e);
    });
    fetch('http://localhost:8080/instagram', {// solicitamos el password del usuario para comparar sera un get
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
        const listings=data.map(listing=>{
         // Convertimos el objeto en un arreglo para hacer la comparacion
            document.getElementById('ig').value=listing.enlace;  
    })
    })
    .catch(e=> {
        console.log(e);
    });
    
    // whatsapp
     fetch('http://localhost:8080/whap', {// solicitamos el password del usuario para comparar sera un get
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
        const listings=data.map(listing=>{
         // Convertimos el objeto en un arreglo para hacer la comparacion
            document.getElementById('wsp').value=listing.enlace;  
    })
    })
    .catch(e=> {
        console.log(e);
    });
    
    // facebook
    
        fetch('http://localhost:8080/facebook', {// solicitamos el password del usuario para comparar sera un get
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
        const listings=data.map(listing=>{
            document.getElementById('fb').value=listing.enlace;  
    })
    })
    .catch(e=> {
        console.log(e);
    });
    
    // Tiktok
    
        fetch('http://localhost:8080/tel', {// solicitamos el password del usuario para comparar sera un get
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
        const listings=data.map(listing=>{
         // Convertimos el objeto en un arreglo para hacer la comparacion
            document.getElementById('tel').value=listing.enlace;  
    })
    })
    .catch(e=> {
        console.log(e);
    });
    
    // Email
    
        fetch('http://localhost:8080/email', {// solicitamos el password del usuario para comparar sera un get
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
        const listings=data.map(listing=>{
         // Convertimos el objeto en un arreglo para hacer la comparacion
            document.getElementById('email').value=listing.enlace;  
    })
    })
    .catch(e=> {
        console.log(e);
    });
    //Precio

    fetch('http://localhost:8080/LPP', {// solicitamos el password del usuario para comparar sera un get
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
        const listings=data.map(listing=>{
         // Convertimos el objeto en un arreglo para hacer la comparacion
            document.getElementById('price').value=listing.costo_envio;  
    })
    })
    .catch(e=> {
        console.log(e);
    });
  

    
    
}
function guardado(id_input){
    if(id_input=='user' ){
        let usuario = document.getElementById('user').value;
        let transaction = {usuario:usuario};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/UsuarioA', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='name' ){
        let nombre = document.getElementById('name').value;
        let transaction = {nombre:nombre};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/UsuarioN', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='correo' ){
        let correo = document.getElementById('correo').value;
        let transaction = {correo:correo};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/UsuarioC', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='ig' ){
        let insta = document.getElementById('ig').value;
        let transaction = {insta:insta};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/InstagramA', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='wsp' ){
        let whap = document.getElementById('wsp').value;
        let transaction = {whap:whap};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/whapA', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='fb' ){
        let face = document.getElementById('fb').value;
        let transaction = {face:face};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/faceA', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='tel' ){
        let telefono = document.getElementById('tel').value;
        let transaction = {telefono:telefono};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/telA', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='email' ){
        let email = document.getElementById('email').value;
        let transaction = {email:email};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/emailA', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });
    }
    if(id_input=='price'){
        let departamento = document.getElementById('departamento').value;
        let precio = document.getElementById('price').value;
        console.log(departamento,precio);
        let transaction = {departamento:departamento,precio:precio};
        let transactionJson = JSON.stringify(transaction);
        fetch('http://localhost:8080/precioA', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Actualizado Usuario'))
        .catch(e=> {
            console.log(e);
        });

    }
  

}
/*Habilitar y deshabilitar la opción de editar campo.*/
let n = 0;
function btnChange (id_div, id_img, id_input){ 
    
    if (n == 0){
        console.log(id_input);
        document.getElementById(id_img).src="../public/resources/images/otrasConfiguraciones/guardar.svg";
        document.getElementById(id_input).disabled=false;
        let html = '';
        html += `
        <div id="delete">
            <button type="button" class="cancelar_edit" onclick=" btnChange('${id_div}', '${id_img}', '${id_input}'),guardado('${id_input}')">
                <img id="cancelEdit" src="../public/resources/images/otrasConfiguraciones/cancelar.svg" alt="cancelar" width="28px"/>
            </button>
            <style type="text/css">
                .cancelar_edit { 
                    position: flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 100%;
                    border-width: 0px;
                    background-color: #FFFFFF; 
                }
            </style>
        </div>
        `;
        $('#'+id_div).html(html);
        n = 1;
        
    } else {
        
        document.getElementById(id_img).src="../public/resources/images/otrasConfiguraciones/editar.svg";
        document.getElementById(id_input).disabled=true;
        var y = document.getElementById("delete");
        var x = document.getElementById(id_div);
        x.removeChild (y);
        n = 0;


        
        console.log('guardado');
        fetch('http://localhost:8080/datos', {
        
        }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        
        .then(data=>{ 
           
            const listings=data.map(listing=>{
            
            // Convertimos el objeto en un arreglo para hacer la comparacion
            if(id_input=='user')
                document.getElementById(id_input).value=listing.user;
            if(id_input=='name')
                document.getElementById(id_input).value=listing.nombre;
            if(id_input=='correo')
                document.getElementById(id_input).value=listing.correo;
        })


        })
        .catch(e=> {
            console.log(e);
        });
        // instagram
        if(id_input=='ig'){
            fetch('http://localhost:8080/instagram', {// solicitamos el password del usuario para comparar sera un get
        }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        .then(data=>{ 
            const listings=data.map(listing=>{
             // Convertimos el objeto en un arreglo para hacer la comparacion
                document.getElementById(id_input).value=listing.enlace;  
        })
        })
        .catch(e=> {
            console.log(e);
        });
        }
        // whatsapp
        if(id_input=='wsp'){
            fetch('http://localhost:8080/whap', {// solicitamos el password del usuario para comparar sera un get
        }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        .then(data=>{ 
            const listings=data.map(listing=>{
             // Convertimos el objeto en un arreglo para hacer la comparacion
                document.getElementById(id_input).value=listing.enlace;  
        })
        })
        .catch(e=> {
            console.log(e);
        });
        }
        // facebook
        if(id_input=='fb'){
            fetch('http://localhost:8080/facebook', {// solicitamos el password del usuario para comparar sera un get
        }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        .then(data=>{ 
            const listings=data.map(listing=>{
                document.getElementById(id_input).value=listing.enlace;  
        })
        })
        .catch(e=> {
            console.log(e);
        });
        }
        // Tiktok
        if(id_input=='tel'){
            fetch('http://localhost:8080/tel', {// solicitamos el password del usuario para comparar sera un get
        }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        .then(data=>{ 
            const listings=data.map(listing=>{
             // Convertimos el objeto en un arreglo para hacer la comparacion
                document.getElementById(id_input).value=listing.enlace;  
        })
        })
        .catch(e=> {
            console.log(e);
        });
        }
        // Email
        if(id_input=='email'){
            fetch('http://localhost:8080/email', {// solicitamos el password del usuario para comparar sera un get
        }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        .then(data=>{ 
            const listings=data.map(listing=>{
             // Convertimos el objeto en un arreglo para hacer la comparacion
                document.getElementById(id_input).value=listing.enlace;  
        })
        })
        .catch(e=> {
            console.log(e);
        });
        }



    }
}

/*Mostrar password*/
function mostrarPassword(id_passw, id_icon){
    var cambio = document.getElementById(id_passw);
    if(cambio.type == "password"){
        cambio.type = "text";
        $('.'+id_icon).removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $('.'+id_icon).removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

/*Cambiar precio dependiendo del departamento*/
const precios = [
    {
        depto: 'La Paz',
        precio: 35
    },
    {
        depto: 'Cochabamba',
        precio: 40
    },
    {
        depto: 'Santa Cruz',
        precio: 30
    },
];


function cambiarDepto(){
    fetch('http://localhost:8080/departamento',{
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
    //renderizarAdministradores(data);
    
    let d = document.getElementById("departamento").value;
    data.forEach(function(p){
        if (p.nombre == d){
            document.getElementById("price").value=p.costo_envio;
            console.log(d);
            document.getElementById("cualquiera").src=`../public/resources/images/otrasConfiguraciones/${d}.png`;// trabaja aqui xd

        }
    });
    })
    .catch(e=> {
        console.log(e);
    });
    
}

function renderizarAdministradores(admin) {
    let html = '';
    const a= 'http://localhost:8080/Administrador';
    admin.forEach(function(admi){
        
        html += `
            <div class="accordion-item${admi.cod_admin}" id="accordion-item${admi.cod_admin}">
                <h2 class="accordion-header" id="flush-heading${admi.cod_admin}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${admi.cod_admin}" aria-expanded="false" aria-controls="flush-collapse${admi.cod_admin}">
                        Registro de ${admi.nombre}
                    </button>
                </h2>
                <div id="flush-collapse${admi.cod_admin}" class="accordion-collapse collapse" aria-labelledby="flush-heading${admi.cod_admin}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="informacion${admi.cod_admin}">
                            Información del administrador <br>
                            <t>Código:  ${admi.cod_admin} <br>
                            <t>Nombre de usuario:  ${admi.user} <br>
                            <t> Correo electrónico:  ${admi.correo} <br>
                            Tipo de administrador:  ${admi.tipo_admin}
                        </div>
                        <div class="btn_eliminar_admi${admi.cod_admin}">
                            <button type="button" class="eliminar${admi.cod_admin}" onclick="btnDelete('accordion-item${admi.cod_admin}','${admi.cod_admin}')">
                                Eliminar<img src="../public/resources/images/otrasConfiguraciones/basurero_blanco.svg" alt="add" width="15px"/>
                            </button>
                        </div>
                    </div>
                </div>
                <style type="text/css">
                    .btn_eliminar_admi${admi.cod_admin} {
                        display: flex;
                        justify-content: right;
                    }
                    .eliminar${admi.cod_admin} {
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
                    .eliminar${admi.cod_admin} img {
                        margin-left: 4%;
                    }
                    .eliminar${admi.cod_admin}:hover {
                        background: palevioletred;
                    }
                    .accordion-item${admi.cod_admin} {
                        border-color: #d4d7d9;
                        border-style: solid;
                        border-width: 0.2px;
                        margin-bottom: 1%;
                    }
                </style>
            </div>
        `;
    });
    $('#administrador').html(html);
}
  
$(function() {
    fetch('http://localhost:8080/ejemplo',{
    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
    .then(data=>{ 
    renderizarAdministradores(data);
    })
    .catch(e=> {
        console.log(e);
    });
    //console.log(precios);
});

function btnDelete (item,cod_admin){
    var y = document.getElementById(item);
    var x = document.getElementById("administrador");
    console.log(cod_admin);
    x.removeChild(y);
    let transaction = {cod_admin:cod_admin}; 
            let transactionJson = JSON.stringify(transaction);
            console.log(transactionJson); // cargamos y mandamos datos 
            fetch('http://localhost:8080/Eliminar', { // mandamos el post 
                    method: 'post',
                    body: transactionJson
            }).then(x => console.log('Eliminado'))
            .catch(e=> {
                console.log(e);
            });

}
const table = 'Administrador';

function verificar(){ // funcion para la comparar que las contraseñas sean iguales
    
        let nombre = document.getElementById('admi_name').value;
        let correo = document.getElementById('admi_correo').value;
        let usuario = document.getElementById('admi_user').value;
        let password = document.getElementById('txtPasswordE').value;
        let confirmaPass = document.getElementById('txtPasswordC').value;
        let tipo_admin = document.getElementById('txtPasswordC').value=0;        
        if(password!=confirmaPass){ //compara las contraseñas
            console.log('error contraseñas no coinciden')
        }else{
        let transaction = { nombre:nombre, correo:correo,usuario:usuario,password:password,tipo_admin:tipo_admin};
        let transactionJson = JSON.stringify(transaction);
        console.log(transactionJson);
        //renderizarAdministradores(transactionJson);
        fetch('http://localhost:8080/ejemplo', {
            method: 'Post',
            body: transactionJson
        }).then(x => console.log('Registrado'))
        .catch(e=> {
            console.log(e);
        });
        }
   
    
}


function ActualizaContra(){ // funcion para cambiar cotnra
    
    
    let password = document.getElementById('txtPasswordA').value;// extraemos datos de los campos del html
    let newpassword = document.getElementById('txtPasswordN').value;        
    
    
    fetch('http://localhost:8080/contra', {// solicitamos el password del usuario para comparar sera un get

    }).then(response => response.json()) // al inicio se recibe los datos en forma de objeto
        .then(data=>{ 
        const listings=data.map(listing=>{ // Convertimos el objeto en un arreglo para hacer la comparacion
        console.log(listing.password);
        console.log(data);

        if(listing.password!=password){ // comparamos
            console.log('error contraseñas no coinciden')
            console.log(listing.password,'f')
        }else{
            let transaction = {newpassword:newpassword}; 
            let transactionJson = JSON.stringify(transaction);
            console.log(transactionJson); // cargamos y mandamos datos 
            fetch('http://localhost:8080/ActualizaC', { // mandamos el post 
                    method: 'post',
                    body: transactionJson
            }).then(x => console.log('Actualizado'))
            .catch(e=> {
                console.log(e);
            });

        }
    })
    })
    .catch(e=> {
        console.log(e);
    });
    
    


}