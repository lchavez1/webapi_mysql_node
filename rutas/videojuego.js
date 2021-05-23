const express = require('express');

const ruteador = express.Router();

module.exports = (servicios) => {

    const servicioVideojuego = servicios.servicioVideojuegos;

    ruteador.get("/", function(request, response){
        servicioVideojuego.obtenerVideojuegos(function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/:idVideojuego", function(request, response){
        let idVideojuego = request.params.idVideojuego;
        servicioVideojuego.obtenerVideojuego(idVideojuego, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.post('/', function(request, response){
        var videojuego = request.body;
        //console.log(videojuego);
        servicioVideojuego.insertarVideojuego(videojuego, function(resultado){
            response.send(resultado);
        })

    });

    ruteador.put('/:idVideojuego', function(request, response){
        let idVideojuego = request.params.idVideojuego;
        var videojuego = request.body;
        servicioVideojuego.modificarVideojuego(idVideojuego, videojuego, function(resultado){
            response.send(resultado);
    });
        });
        

    ruteador.delete('/:idVideojuego', function(request, response){
        let idVideojuego = request.params.idVideojuego;
        servicioVideojuego.eliminarVideojuego(idVideojuego, function(resultado){
            response.send(resultado);
        });
        
    });

    return ruteador;
};
