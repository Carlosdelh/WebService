/**
 * Created by Carlos on 06/05/2016.
 */
module.exports = function (app){
    return{
        add:function(req,res){
            var Comentario = app.get('comentario');
            Comentario.Create({
                contenido: req.body.contenido,
                lugarturisticoIdLugarTuristico: req.body.lugarturisticoIdLugarTuristico,
                usuarioIdUsuario: req.body.usuarioIdUsuario
            }).then(function(departamento){
                res.json(departamento);
            })
        },

        list: function(req,res){
            var Comentario = app.get('comentario');
            Comentario.findAll().then (function (comentarios){
                res.json(comentarios);
            })
        },

        edit: function(req,res){
            var Comentario = app.get('comentario');
            Comentario.find(req.body.id_Comentario).then(function (comentario){
                if(comentario){
                    comentario.updateAttributes({
                        contenido: req.body.contenido,
                        lugarturisticoIdLugarTuristico: req.body.lugarturisticoIdLugarTuristico,
                        usuarioIdUsuario: req.body.usuarioIdUsuario
                    });
                }else{
                    res.status(404).send({ message: 'comentario no encontrado'});
                }
            })
        },

        delete: function(req,res){
            var Comentario = app.get('comentario');
            Comentario.destroy({
                where:{
                    id_Comentario : req.body.id_Comentario
                }
            }).then (function(comentario){
                res.json(comentario);
            });
        },
    }
}