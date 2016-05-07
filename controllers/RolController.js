/**
 * Created by informatica on 06/05/2016.
 */
module.exports = function (app){
    return{
        add:function(req,res){
            var Rol = app.get('rol');
            Rol.Create({
                nombre: req.body.nombre
            }).then(function(rol){
                res.json(rol);
            })
        },

        list: function(req,res){
            var Rol = app.get('rol');
            Rol.findAll().then (function (rols){
                res.json(rols);
            })
        },

        edit: function(req,res){
            var Rol = app.get('rol');
            Rol.find(req.body.id_Rol).then(function (rol){
                if(rol){
                    rol.updateAttributes({
                        nombre: req.body.nombre
                    });
                }else{
                    res.status(404).send({ message: 'rol no encontrado'});
                }
            })
        },

        delete: function(req,res){
            var Rol = app.get('rol');
            Rol.destroy({
                where:{
                    id_Rol : req.body.id_Rol
                }
            }).then (function(rol){
                res.json(rol);
            });
        },

        porid: function(req,res){
            var Rol = app.get('rol');
            Rol.find(req.body.id_Rol).then (function (rol){
                if(rol){
                    res.json(rol);
                }else{
                    res.status (404).send({message: 'rol no encontrado'});
                }
            });
        },

        rolconusuarios: function(req,res){
            var Rol = app.get('rol');
            var Usuario = app.get('usuario');
            Rol.find({where : {id_Rol: req.params.id}, include: (Usuario)}).then(function(rol){
                res.json(rol);
            })
        },
    }
}