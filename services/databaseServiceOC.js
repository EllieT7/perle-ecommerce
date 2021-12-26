const { json } = require('body-parser');

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


    const crearDpto = ({ nombre, correo,user,password,tipo_admin}) =>{ //Deconstruyendo json
        return knex('Administrador').insert({
            nombre : nombre,
            correo : correo,
            user:user,
            password:password,
            tipo_admin:tipo_admin
        });//retorna una promesa
    };
    
    const ActualizaC =({newpassword})=>{// importante poner entre {} caso contrario tomara como si fuera un objeto
        return knex('Administrador').where('cod_admin',1).update({'password': newpassword});
    };
    
    const EliminarAdmin =({cod_admin})=>{
        return knex('Administrador').where('cod_admin',cod_admin).del();
    };
    const EditarAdminN =({nombre})=>{ 
        return knex('Administrador').where('cod_admin',1).update({'nombre': nombre});
    };
    const EditarAdminC =({correo})=>{ 
        return knex('Administrador').where('cod_admin',1).update({'correo':correo});
    };
    const EditarAdminU =({user})=>{ 
        return knex('Administrador').where('cod_admin',1).update({'user':user});
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
        return knex('Administrador').select();
    };

    const Contra = ()=>{
        return knex('Administrador').select('password').where('cod_admin',1);
    }
    const datos = ()=>{
        return knex('Administrador','contacto').select().where('cod_admin',1);
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
        return knex('Administrador').select();
    }
    const departamento = ()=>{
        return knex('Departamento').select();
    }
    const UsuarioA = ()=>{
        return knex('Administrador').select();
    }
    


    return {crearDpto, ActualizaC,EliminarAdmin,EditarAdminN,EditarAdminC,EditarAdminU,leer,Contra,datos,Admin,departamento,insta,whap,facebook,tel,email,UsuarioA,EditarIns,EditarWhap,EditarTel,EditarFace,EditarEmail,EditarPrecio,LPP};
    

};
//Exportamos a toda la aplicacion
module.exports = {
    databaseServiceOC
};