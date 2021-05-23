const express = require('express');

const ruteador = express.Router();

module.exports = (servicios) => {

    const servicioUsuario = servicios.servicioUsuarios;

    ruteador.get("/", function(request, response){
        servicioUsuario.obtenerUsuarios(function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.get("/:idUsuario", function(request, response){
        let idUsuario = request.params.idUsuario;
        servicioUsuario.obtenerUsuario(idUsuario, function(resultado){
            response.send(resultado);
        });    
    });

    ruteador.post('/', function(request, response){
        var usuario = request.body;
        //console.log(videojuego);
        servicioUsuario.insertarUsuario(usuario, function(resultado){
            response.send(resultado);
        })

    });

    ruteador.put('/:idUsuario', function(request, response){
        let idUsuario = request.params.idUsuario;
        var usuario = request.body;
        servicioUsuario.modificarUsuario(idUsuario, usuario, function(resultado){
            response.send(resultado);
        });
    });

    ruteador.delete('/:idUsuario', function(request, response){
        let idUsuario = request.params.idUsuario;
        servicioUsuario.eliminarUsuario(idUsuario, function(resultado){
            response.send(resultado);
        });
        
    });

    return ruteador;
};
