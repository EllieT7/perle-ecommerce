require('dotenv').config()
// Dependencias
// Importar express
const express = require('express');
// Importar cors
const cors = require('cors');
// Importar path
const path = require('path');
// Módulo File System, para poder trabajar con archivos (porder crearlos,
// escribir contenido, y trabajar con archivos de texto plano).
const fs = require('fs');
// Importar multer
const multer = require('multer');
//body parser --> middleware
let bodyParser = require('body-parser');
const { databaseService } = require('./services/databaseService');
const { databaseServiceOC } = require('./services/databaseServiceOC');


// Instanciar una aplicacion en express
const app = express();

//Inicio el middleware 
app.use(bodyParser.json());
app.use(cors());



// // Establezco mis vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');                              //hbs handlebars, archivos con formato html
app.use(express.static(path.join(__dirname, 'public')));    //Declarando mi ruta estatica (css, js, resources)
//rutas
usuariosPath = '/api/usuarios';
authPath = '/api/auth';


//Configuracion multer

app.use(express.static(path.join(__dirname, '/public/resources/images/Administrador')));
bodyParser = {
    json: {limit: '500mb', extended: true},
    urlencoded: {limit: '500mb', extended: true}
};

  
//middlewares
const storage = multer.diskStorage({
    
    destination: path.join(__dirname, '/public/resources/images/Administrador'),
    filename: (req,file,cb) =>{
        cb(null, file.originalname);
    } 
})

app.use(multer({
    storage: storage,
    destination: path.join(__dirname, '/public/resources/images/Administrador'),
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



// Conectarme con los archivos de rutas -->siempre abajo
const dbService = databaseService();
const dbServiceOC = databaseServiceOC();
// Linkeo entre app.js y routes.js
require('./routes/routes')(app, dbService);
require('./routes/routes-2')(app); 
require('./routes/render-routes')(app); //Para mostrar las interfaces
app.use( authPath, require('./routes/auth'));
app.use(usuariosPath,require('./routes/usuarios'));  
require('./routes/routes-login')(app);
require('./routes/routes-otrasConf')(app, dbServiceOC);


// Escuchar las peticiones en el puerto 8080.
app.listen(8080, function(){
    console.log('App listening on port 8080!')
});


//Mica
// Para generar archivos pdf
const PDFDocument = require("./pdfkit-tables");

// Cargar la informacion.
const pedidos = require("./pedidos.json");

// Crear el documento pdf.
const doc = new PDFDocument();

// Enviar el documento a un archivo pdf.
doc.pipe(fs.createWriteStream("pedidos.pdf"));

// Agregar el encabezado.
doc
    .image("./public/resources/images/otros/logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Información de Pedidos", 110, 57)
    .fontSize(10)
    .text("Perle", 200, 65, { align: "right" })
    .text("Bordados hechos con amor", 200, 80, { align: "right" })
    .moveDown();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
const table = {
    headers: ["Pedido", "Fecha aproximada de entrega", "Nombre del cliente", "Teléfono del cliente", "Departamento", "Costo del envío", "Producto", "Cantidad"],
    rows: [
        []
    ]
};

// Cargar a las filas los datos.
for (const pedido of pedidos) {
    table.rows.push([pedido.pedido, pedido.fecha, pedido.nombre,
        pedido.telefono, pedido.departamento, pedido.costo, pedido.producto, pedido.cantidad])
}

// Diseñar la tabla.
doc.moveDown().table(table, 10, 125, { width: 590});

// Finalizar el documento PDF y mostrar.
doc.end();
