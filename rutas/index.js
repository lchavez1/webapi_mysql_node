const express = require('express');


const ruteador = express.Router();
const rutaVideojuegos = require("./videojuego");
const rutaUsuarios = require("./usuario");
const rutaCompras = require("./compra");

module.exports = (servicios) => {

    ruteador.use(express.json());
    ruteador.use((request, response, next) => {
        response.setHeader('Content-Type', 'aplication/json');
        return next();
    });

    ruteador.get("/", function(request, response){
        response.send('Welcome to the WebApi');
    });

    ruteador.use('/videojuego', rutaVideojuegos(servicios));
    ruteador.use('/usuario', rutaUsuarios(servicios));
    ruteador.use('/compra', rutaCompras(servicios));

    return ruteador;

};
