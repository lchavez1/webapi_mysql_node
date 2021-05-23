
const mysql = require('mysql');

class servicioCompra{

    constructor(cadenaConexion){
        this.cadenaConexion = cadenaConexion;
    }

    obtenerCompras(regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();
        
        conexion.query("select idCompra, v.nombre as videojuego, u.nombre as usuario from usuario as u inner join compra as c on u.idUsuario = c.usuario inner join videojuego as v on c.videojuego = v.idVideojuego;", function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }
            
        });
    }

    obtenerCompra(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "select idCompra, v.nombre as videojuego, u.nombre as usuario from usuario as u inner join compra as c on u.idUsuario = c.usuario inner join videojuego as v on c.videojuego = v.idVideojuego where idCompra = ?;";
        let values = [id];

        conexion.query(query, values, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }
            
        });
    }

    obtenerComprasPorUsuario(idUsuario, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "select idCompra, v.nombre as videojuego, u.nombre as usuario, c.usuario as idUsuario from usuario as u inner join compra as c on u.idUsuario = c.usuario inner join videojuego as v on c.videojuego = v.idVideojuego where idUsuario = ?";
        var values = [idUsuario];

        conexion.query(query, values,  function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                conexion.end();
                regeresarResultado(resultado);
            }        
        });
    }

    obtenerComprasPorVideojuego(videojuego, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "select idCompra, v.nombre as videojuego, u.nombre as usuario from usuario as u inner join compra as c on u.idUsuario = c.usuario inner join videojuego as v on c.videojuego = v.idVideojuego where v.idVideojuego = ?"
        let valores = [videojuego];

        
        conexion.query(query, valores, function(error, resultado, parametros){
            conexion.end();
            regeresarResultado(resultado);
        });
    }

    insertarCompra(compra, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "insert into compra(videojuego, usuario) "+ "values (?, ?) ";
        var valores = [
            compra.videojuego,
            compra.usuario
        ];

        conexion.query(query, valores, function(error, resultado, parametros){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
            conexion.query("select last_insert_id() as idCompra", function(error, id, parametros){
                conexion.end();
                regeresarResultado(id);
            });
            }   
        }); 
    }

    modificarCompra(id, compra, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "update compra set videojuego = ?, usuario = ? where idCompra = ?;";
        var valores = [
            compra.videojuego,
            compra.usuario,
            id
        ];

        conexion.query(query, valores, function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                if(resultado.affectedRows != 0){
                    var mensaje = "Se actualizo con exito la compra con id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                } else {
                    var mensaje = "No se encontro informacion para el id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                }  
                conexion.end();
            }
        });
    }

    eliminarCompra(id, regeresarResultado){
        var conexion = mysql.createConnection(this.cadenaConexion);
        conexion.connect();

        let query = "delete from compra where idCompra = ?;";
        let values = [id];
        
        conexion.query(query, values,  function(error, resultado, campos){
            if(error){
                regeresarResultado( {"mensaje" : error});
            } else {
                //console.log(resultado);
                if(resultado.affectedRows != 0){
                    var mensaje = "Se elimino con exito la compra con id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                } else {
                    var mensaje = "No se encontro informacion para el id = " + id;
                    regeresarResultado( {"mensaje" : mensaje});
                }  
                conexion.end();  
            }
        });
    }

}

module.exports = servicioCompra;