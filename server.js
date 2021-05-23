const express = require('express');

const app = express();
const port = 1025;

const cadenaConexion = {
    host : "localhost",
    user : "root",
    password : "password",
    database : "epic"
};

const conexionAzure = {
    host: "luisserver123.mysql.database.azure.com", 
    user: "Luis@luisserver123", 
    password: "Password1", 
    database: "epic", 
    port: 3306
};

const ruteador = express.Router();
const rutas = require('./rutas');

const servicioVideojuego = require('./servicios/servicioVideojuego');
const servicioVideojuegos = new servicioVideojuego(cadenaConexion);

const servicioUsuario = require('./servicios/servicioUsuario');
const servicioUsuarios = new servicioUsuario(cadenaConexion);

const servicioCompra = require('./servicios/servicioCompra');
const servicioCompras = new servicioCompra(cadenaConexion);


app.use('/api', rutas( {servicioVideojuegos, servicioUsuarios, servicioCompras} ));

app.listen(port, function(){
    console.log("Node is listening in port " + port);
});

/*

const conexion = mysql.createConnection(paramatetrosConexion)

conexion.connect(function(error){
    if(error){
        console.log(error);
        response.send({mensaje: "Ocurrio un error"});
    }
});

app.get('/videojuego', function(request, response){
    response.setHeader('Content-Type', 'aplication/json');

    let idVideojuego = request.params.idVideojuego;
    let query = "select * from videojuego";
    conexion.query(query, function(error, resultado, parametros){
        response.send(resultado);
    });
});

app.get('/videojuego/:idVideojuego', function(request, response){
        response.setHeader('Content-Type', 'aplication/json');

        let idVideojuego = request.params.idVideojuego;
        let query = "select * from videojuego where idVideojuego = " + idVideojuego;
        conexion.query(query, function(error, resultado, parametros){
            response.send(resultado);
        });
});*/
