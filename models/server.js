const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../DB/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        //paths
        this.categoriaPath       = '/api/categoria';
        this.carroPath           = '/api/carro';
        this.productoPath        = '/api/producto';
        this.ordenPath           = '/api/orden';
        this.uploadProductoPath  = '/api/upload';
        this.checkoutPath        = '/api/checkout'; 

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();
        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json())
        
        //Directorio público
        this.app.use(express.static('public'));

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));


    }

    routes(){      
        this.app.use(this.categoriaPath, require('../routes/categorias.routes'));
        this.app.use(this.carroPath, require('../routes/carros.routes'));
        this.app.use(this.ordenPath, require('../routes/ordenes.routes'));
        this.app.use(this.productoPath, require('../routes/productos.routes'));
       this.app.use(this.uploadProductoPath, require('../routes/uploads.routes'));
       this.app.use(this.checkoutPath, require('../routes/pagos.routes'));




    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;