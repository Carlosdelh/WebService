/**
 * Created by informatica on 06/05/2016.
 */
var ruta = require('express').Router();
module.exports = (function (app){
    var departamento = require('../controllers/DepartamentoController')(app);
    var rol = require('../controllers/RolController')(app);
    var usuario = require('../controllers/UsuarioController')(app);
    var lugarturistico = require('../controllers/LugarTuristicoController')(app);
    var hotel = require('../controllers/HotelController')(app);
    var comentario = require('../controllers/ComentarioController')(app);

    /*
        Rutas para los Departamentos
     */
    ruta.get('/departamento', departamento.list);
    ruta.post('/departamento', departamento.add);
    ruta.put('/departamento', departamento.edit);
    ruta.delete('/departamento', departamento.delete);
    ruta.get('/departamento', departamento.departamentoconlugares);

    /*
     Rutas para los Roles
     */
    ruta.get('/rol', rol.list);
    ruta.post('/rol', rol.add);
    ruta.put('/rol', rol.edit);
    ruta.delete('/rol', rol.delete);
    ruta.get('/rol', rol.rolconusuarios);

    /*
     Rutas para los Usuario
     */
    ruta.get('/usuario', usuario.list);
    ruta.post('/usuario', usuario.add);
    ruta.put('/usuario', usuario.edit);
    ruta.delete('/usuario', usuario.delete);
    ruta.get('/usuario', usuario.usuarioconcomentarios);

    /*
     Rutas para los Lugares Turisticos
     */
    ruta.get('/lugarturistico', lugarturistico.list);
    ruta.post('/lugarturistico', lugarturistico.add);
    ruta.put('/lugarturistico', lugarturistico.edit);
    ruta.delete('/lugarturistico', lugarturistico.delete);
    ruta.get('/lugarturistico', lugarturistico.lugarturisticoconcomentarios);
    ruta.get('/lugarturistico', lugarturistico.lugarturisticoconhoteles);

    /*
     Rutas para los Hoteles
     */
    ruta.get('/hotel', hotel.list);
    ruta.post('/hotel', hotel.add);
    ruta.put('/hotel', hotel.edit);
    ruta.delete('/hotel', hotel.delete);

    /*
     Rutas para los Comentarios
     */
    ruta.get('/comentario', comentario.list);
    ruta.post('/comentario', comentario.add);
    ruta.put('/comentario', comentario.edit);
    ruta.delete('/comentario', comentario.delete);

    return ruta;
});