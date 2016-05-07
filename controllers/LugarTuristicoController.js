/**
 * Created by informatica on 06/05/2016.
 */
module.exports = function (app){
    return{
        add:function(req,res){
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.Create({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                descripcion: req.body.descripcion,
                departamentoIdDepartamento: req.body.departamentoIdDepartamento
            }).then(function(lugarturixtico){
                res.json(lugarturistico);
            })
        },

        list: function(req,res){
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.findAll().then (function (lugaresturisticos){
                res.json(lugaresturisticos);
            })
        },

        edit: function(req,res){
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.find(req.body.id_LugarTuristico).then(function (lugarturistico){
                if(lugarturistico){
                    lugarturistico.updateAttributes({
                        nombre: req.body.nombre,
                        direccion: req.body.direccion,
                        descripcion: req.body.descripcion,
                        departamentoIdDepartamento: req.body.departamentoIdDepartamento
                    });
                }else{
                    res.status(404).send({ message: 'lugar turistico no encontrado'});
                }
            })
        },

        delete: function(req,res){
            var LugarTuristico = app.get('lugarturistico');
            LugarTuristico.destroy({
                where:{
                    id_LugarTuristico : req.body.id_LugarTuristico
                }
            }).then (function(lugarturistico){
                res.json(lugarturistico);
            });
        },

        lugarturisticoconcomentarios: function(req,res){
            var LugarTuristico = app.get('lugarturistico');
            var Comentario = app.get('comentario');
            LugarTuristico.find({where : {id_LugarTuristico: req.params.id}, include: (Comentario)}).then(function(lugarturistico){
                res.json(lugarturistico);
            })
        },

        lugarturisticoconhoteles: function(req,res){
            var LugarTuristico = app.get('lugarturistico');
            var Hotel = app.get('hotel');
            LugarTuristico.find({where : {id_LugarTuristico: req.params.id}, include: (Hotel)}).then(function(lugarturistico){
                res.json(lugarturistico);
            })
        },
    }
}