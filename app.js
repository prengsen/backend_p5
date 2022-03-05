import express from "express";
import bodyParser from "body-parser";

import placesRoutes from './routes/places-routes.js';

const port = 5001; //puerto de ejeución del server
const app = express();

//habilitamos bodyParser
app.use(bodyParser.json());

//registramos middleware para gestion de rutas de places.
app.use('/api/places', placesRoutes);

//middleware para error handling.
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }else{
        res.status(error.code || 500);
        res.json({mensaje: error.message || 'Ocurrio un error desconocido.'})
    }
});


app.listen(port);