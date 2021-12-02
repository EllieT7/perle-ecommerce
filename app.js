require('dotenv').config()
// Dependencias
// Importar express
const express = require('express');
// Importar cors
const cors = require('cors');
// Importar path
const path = require('path');
// Importar fs
const fs = require('fs');
// Importar multer
const multer = require('multer');
// Importar uuid
const uuid = require('uuid');
//body parser --> middleware
let bodyParser = require('body-parser');
const { databaseService } = require('./services/databaseService');
const { databaseServiceOC } = require('./services/databaseServiceOC');


// const Server = require('./models/server');  //nuevo
// const server = new Server();                //nuevo
// Instanciar una aplicacion en express
const app = express();

//Inicio el middleware 
// app.use(bodyParser.json());
app.use(cors());

// Conectarme con los archivos de rutas
const dbService = databaseService();
const dbServiceOC = databaseServiceOC();
// Linkeo entre app.js y routes.js
require('./routes/routes')(app, dbService);
require('./routes/render-routes')(app); //Para mostrar las interfaces

// Establezco mis vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');                              //hbs handlebars, archivos con formato html
app.use(express.static(path.join(__dirname, 'public')));    //Declarando mi ruta estatica (css, js, resources)
//rutas
usuariosPath = '/api/usuarios';
authPath = '/api/auth';
app.use( authPath, require('./routes/auth'));
app.use(usuariosPath,require('./routes/usuarios'));  
require('./routes/routes-login')(app);
require('./routes/routes-2')(app);  
require('./routes/routes-otrasConf')(app, dbServiceOC);

//Configuracion multer

app.use(express.static(path.join(__dirname, '/public/resources/images/Administrador')));
bodyParser = {
    json: {limit: '500mb', extended: true},
    urlencoded: {limit: '500mb', extended: true}
};
// app.use(express.json({strict: false}));
  
//middlewares
const storage = multer.diskStorage({
    
    destination: path.join(__dirname, '/public/resources/images/Administrador'),
    filename: (req,file,cb) =>{
        // cb(null, file.originalname + uuid.v4() + path.extname(file.originalname));
        cb(null, file.originalname);
    } 
})

app.use(multer({
    storage: storage,
    destination: path.join(__dirname, '/public/resources/images/images/Administrador'),
    limits: {fileSize: 2000000},
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }
        cb('Error: Extension no soportada');
    }
}).single('image'));






// Escuchar las peticiones en el puerto 8080.
app.listen(8080, function(){
    console.log('App listening on port 8080!')
});