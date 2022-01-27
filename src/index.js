const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
//rutas
app.use('/crypto',require('./rutas/rutas_api'))
app.use(express.static(path.join(__dirname, 'public')))
//server
app.listen(app.get('port'), ()=> {
    console.log(`Servidor en linea - puerto ${app.get('port')}`);
})