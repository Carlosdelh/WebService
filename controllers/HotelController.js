/**
 * Created by informatica on 06/05/2016.
 */
module.exports = function (app){
    return{
        add:function(req,res){
            var Hotel = app.get('hotel');
            Hotel.Create({
                nombre: req.body.nombre,
                no_Estrellas: req.body.no_Estrellas,
                descripcion: req.body.descripcion,
                lugarturisticoIdLugarTuristico : req.body.lugarturisticoIdLugarTuristico
            }).then(function(hotel){
                res.json(hotel);
            })
        },

        list: function(req,res){
            var Hotel = app.get('hotel');
            Hotel.findAll().then (function (hoteles){
                res.json(hoteles);
            })
        },

        edit: function(req,res){
            var Hotel = app.get('hotel');
            Hotel.find(req.body.id_Hotel).then(function (hotel){
                if(hotel){
                    hotel.updateAttributes({
                        nombre: req.body.nombre,
                        no_Estrellas: req.body.no_Estrellas,
                        descripcion: req.body.descripcion,
                        lugarturisticoIdLugarTuristico : req.body.lugarturisticoIdLugarTuristico
                    });
                }else{
                    res.status(404).send({ message: 'hotel no encontrado'});
                }
            })
        },

        delete: function(req,res){
            var Hotel = app.get('hotel');
            Hotel.destroy({
                where:{
                    id_Hotel : req.body.id_Hotel
                }
            }).then (function(hotel){
                res.json(hotel);
            });
        },
    }
}