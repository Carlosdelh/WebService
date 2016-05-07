/**
 * Created by Carlos on 05/05/2016.
 */
module.exports = function (app){
    return{
        add:function(req,res){
            var Departamento = app.get('departamento');
            Departamento.Create({
                nombre: req.body.nombre
            }).then(function(departamento){
                res.json(departamento);
            })
        },

        list: function(req,res){
            var Departamento = app.get('departamento');
            Departamento.findAll().then (function (departamentos){
                res.json(departamentos);
            })
        },

        edit: function(req,res){
            var Departamento = app.get('departamento');
            Departamento.find(req.body.id_Departamento).then(function (departamento){
                if(departamento){
                    departamento.updateAttributes({
                        nombre: req.body.nombre
                    });
                }else{
                    res.status(404).send({ message: 'departamento no encontrado'});
                }
            })
        },

        delete: function(req,res){
            var Departamento = app.get('departamento');
            Departamento.destroy({
                where:{
                    id_Departamento : req.body.id_Departamento
                }
            }).then (function(departamento){
               res.json(departamento);
            });
        },

        porid: function(req,res){
            var Departamento = app.get('departamento');
            Departamento.find(req.body.id_Departamento).then (function (departamento){
               if(departamento){
                   res.json(departamento);
               }else{
                    res.status (404).send({message: 'departamento no encontrado'});
               }
            });
        },

        departamentoconlugares: function(req,res){
            var Departamento = app.get('departamento');
            var LugarTuristico = app.get('lugarturistico');
            Departamento.find({where : {id_Departamento: req.params.id}, include: (LugarTuristico)}).then(function(departamento){
                res.json(departamento);
            })
        },
    }
}