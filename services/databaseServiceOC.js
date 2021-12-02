const databaseServiceOC = () => {

    const knex = require('knex')({
        client : 'mssql',
        connection:{
            server : process.env.DB_HOST,
            user: process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB,
        }
        
    });

    //Nombre de la tabla
    const table = 'Administrador';

    const crearDpto = ({cod_admin, nombre, correo,usuario,pasword,tipo_admin}) =>{ //Deconstruyendo json
        return knex('administrador').insert({
            cod_admin: cod_admin,
            nombre : nombre,
            correo : correo,
            usuario:usuario,
            pasword:pasword,
            tipo_admin:tipo_admin
        });//retorna una promesa
    };
    
    const ActualizaC =({newpasword})=>{// importante poner entre {} caso contrario tomara como si fuera un objeto
        return knex('administrador').where('cod_admin',390).update({'pasword': newpasword});
    };
    
    const EliminarAdmin =({cod_admin})=>{
        return knex('administrador').where('cod_admin',cod_admin).del();
    };
    const EditarAdminN =({nombre})=>{ 
        return knex('administrador').where('cod_admin',390).update({'nombre': nombre});
    };
    const EditarAdminC =({correo})=>{ 
        return knex('administrador').where('cod_admin',390).update({'correo':correo});
    };
    const EditarAdminU =({usuario})=>{ 
        return knex('administrador').where('cod_admin',390).update({'usuario':usuario});
    };
    //actualiza datos de la tabla contacto
    const EditarIns =({insta})=>{ 
        return knex('contacto').where('cod_contacto',1).update({'enlace':insta});
    };
    const EditarWhap =({whap})=>{ 
        return knex('contacto').where('cod_contacto',2).update({'enlace':whap});
    };
    const EditarFace =({face})=>{ 
        return knex('contacto').where('cod_contacto',3).update({'enlace':face});
    };
    const EditarTel =({telefono})=>{ 
        return knex('contacto').where('cod_contacto',4).update({'enlace':telefono});
    };
    const EditarEmail =({email})=>{ 
        return knex('contacto').where('cod_contacto',5).update({'enlace':email});
    };
    const EditarPrecio =({departamento,precio})=>{ 
        return knex('departamento').where('nombre',departamento).update({'costo_envio':precio});
    };

    const leer = () =>{
        return knex('administrador').select();
    };

    const Contra = ()=>{
        return knex('administrador').select('pasword').where('cod_admin',390);
    }
    const datos = ()=>{
        return knex('administrador','contacto').select().where('cod_admin',390);
    }
    const insta = ()=>{
        return knex('contacto').select().where('cod_contacto',1);
    }
    const whap = ()=>{
        return knex('contacto').select().where('cod_contacto',2);
    }
    const facebook = ()=>{
        return knex('contacto').select().where('cod_contacto',3);
    }
    const tel = ()=>{
        return knex('contacto').select().where('cod_contacto',4);
    }
    const email = ()=>{
        return knex('contacto').select().where('cod_contacto',5);
    }
    const LPP = ()=>{
        return knex('Departamento').select().where('cod_dpto',1);
    }
    const Admin = ()=>{
        return knex('administrador').select();
    }
    const departamento = ()=>{
        return knex('Departamento').select();
    }
    const UsuarioA = ()=>{
        return knex('administrador').select();
    }
    


    return {crearDpto, ActualizaC,EliminarAdmin,EditarAdminN,EditarAdminC,EditarAdminU,leer,Contra,datos,Admin,departamento,insta,whap,facebook,tel,email,UsuarioA,EditarIns,EditarWhap,EditarTel,EditarFace,EditarEmail,EditarPrecio,LPP};
    

};
//Exportamos a toda la aplicacion
module.exports = {
    databaseServiceOC
};