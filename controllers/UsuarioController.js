/**
 * Created by informatica on 06/05/2016.
 */
module.exports = function (app){
    return{
        add:function(req,res){
            var Usuario = app.get('usuario');
            Usuario.Create({
                nombre: req.body.nombre,
                correo: req.body.correo,
                nick: req.body.nick,
                contrasena: req.body.contrasena,
                rolIdRol: req.body.rolIdRol
            }).then(function(usuario){
                res.json(usuario);
            })
        },

        list: function(req,res){
            var Usuario = app.get('usuario');
            Usuario.findAll().then (function (usuarios){
                res.json(usuarios);
            })
        },

        edit: function(req,res){
            var Usuario = app.get('usuario');
            Usuario.find(req.body.id_Usuario).then(function (usuario){
                if(usuario){
                    usuario.updateAttributes({
                        nombre: req.body.nombre,
                        correo: req.body.correo,
                        nick: req.body.nick,
                        contrasena: req.body.contrasena,
                        rolIdRol: req.body.rolIdRol
                    });
                }else{
                    res.status(404).send({ message: 'usuario no encontrado'});
                }
            })
        },
        
        delete: function(req,res){
            var Usuario = app.get('usuario');
            Usuario.destroy({
                where:{
                    id_Usuario : req.body.id_Usuario
                }
            }).then (function(usuario){
                res.json(usuario);
            });
        },

        usuarioconcomentarios: function(req,res){
            var Usuario = app.get('usuario');
            var Comentario = app.get('comentario');
            Usuario.find({where : {id_Usuario: req.params.id}, include: (Comentario)}).then(function(usuario){
                res.json(usuario);
            })
        },
    }
}