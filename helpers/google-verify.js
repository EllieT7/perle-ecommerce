
const { databaseService } = require('../services/databaseService');
//npm install google-auth-library --save


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('596294577475-507qila0r6n3njdtcjlh3o5iabq349mv.apps.googleusercontent.com');

async function googleVerify( token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience:'596294577475-507qila0r6n3njdtcjlh3o5iabq349mv.apps.googleusercontent.com',  
  });
  const{name, email} = ticket.getPayload();
   return{
      nombre: name, 
      correo: email
   }
}

module.exports={
    googleVerify
}
