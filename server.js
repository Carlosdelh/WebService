/**
 * Created by Carlos on 05/05/2016.
 */
(function (){
    var express=require('express');
    var bodyParser=require('body-parser');
    var morgan=require('morgan');
    var mysql=require('mysql');
    var Sequelize=require('sequelize');

    var sequelize = new Sequelize ('DB_Turismo', 'root', 'carlos', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
                max:20,
                min: 0,
                idle: 10000
        }
    })

    /*
        Declaracion de los modelos con el ORM
     */
    var Rol = sequelize.define('rol', {
        id_Rol: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement : true},
        nombre: {type: Sequelize.STRING, allowNull: false}
    });
    var Usuario = sequelize.define('usuario', {
        id_Usuario: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement : true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        correo: {type: Sequelize.STRING, allowNull: false},
        nick: {type: Sequelize.STRING, allowNull: false},
        contrasena: {type: Sequelize.STRING, allowNull: false}
    });

    var Departamento = sequelize.define('departamento', {
        id_Departamento: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement : true},
        nombre: {type: Sequelize.STRING, allowNull: false}
    });
    
    var LugarTuristico = sequelize.define('lugarturistico', {
       id_LugarTuristico :  {type: Sequelize.INTEGER, primaryKey: true, autoIncrement : true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        direccion: {type: Sequelize.STRING, allowNull: false},
        descripcion: {type: Sequelize.STRING, allowNull: false}
    });

    var Hotel = sequelize.define('hotel', {
        id_Hotel: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement : true},
        nombre: {type: Sequelize.STRING, allowNull: false},
        no_Estrellas: {type: Sequelize.INTEGER, allowNull: false},
        descripcion: {type: Sequelize.STRING, allowNull: false}
    });

    var Comentario = sequelize.define('comentario', {
        id_Comentario: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement : true},
        contenido: {type: Sequelize.STRING, allowNull: false}
    });

    Departamento.hasMany(LugarTuristico, {constraint: true});
    LugarTuristico.belongsTo(Departamento, {constraint: true});

    LugarTuristico.hasMany(Hotel, {constraint: true});
    Hotel.belongsTo(LugarTuristico, {constraint: true});

    LugarTuristico.hasMany(Comentario, {constraint: true});
    Comentario.belongsTo(LugarTuristico, {constraint: true});

    Usuario.hasMany(Comentario, {constraint: true});
    Comentario.belongsTo(Usuario, {constraint: true});

    Rol.hasMany(Usuario, {constraint: true});
    Usuario.belongsTo(Rol, {constraint: true});


    sequelize.sync({force: true});
    var puerto=3000;
    var conf =require('./config');
    var app=express();
    app.use(bodyParser.urlencoded({
        extended:false
    }));
    app.use(bodyParser.json());
    app.use('/api/v1',require('./routes')(app));
    app.use(morgan('dev'));

    app.set('departamento', Departamento);
    app.set('lugarturistico', LugarTuristico);
    app.set('rol', Rol);
    app.set('usuario', Usuario);
    app.set('comentario', Comentario);
    app.set('hotel', Hotel);

    app.listen(puerto,function(){
        console.log("Servidor iniciado en el puerto: "+puerto);
    });
})();