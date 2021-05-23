const express = require('express');

const ruteador = express.Router();

module.exports = (servicios) => {

    const servicioCompra = servicios.servicioCompras;

    ruteador.get("/", function(request, response){
        servicioCompra.obtenerCompras(function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/:idCompra", function(request, response){
        let idCompra = request.params.idCompra;
        servicioCompra.obtenerCompra(idCompra, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/usuario/:idusuario", function(request, response){
        let idusuario = request.params.idusuario;
        servicioCompra.obtenerComprasPorUsuario(idusuario, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/videojuego/:idVideojuego", function(request, response){
        let idVideojuego = request.params.idVideojuego;
        servicioCompra.obtenerComprasPorVideojuego(idVideojuego, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.post('/', function(request, response){
        var compra = request.body;
        servicioCompra.insertarCompra(compra, function(resultado){
            response.send(resultado);
        });
    });

    ruteador.put('/:idCompra', function(request, response){
        let idCompra = request.params.idCompra;
        var compra = request.body;
        servicioCompra.modificarCompra(idCompra, compra, function(resultado){
            response.send(resultado);
        });
        
    });

    ruteador.delete('/:idCompra', function(request, response){
        let idCompra = request.params.idCompra;
        servicioCompra.eliminarCompra(idCompra, function(resultado){
            response.send(resultado);
        });
        
    });
    
    return ruteador;
};
