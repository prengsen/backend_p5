import {v4 as uuidv4} from 'uuid';

import HttpError from '../models/http-error.js';

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Tikal',
        description: 'Capital del Mundo Maya',
        addres: 'Parque Nacional Tikal, ubicado en el departamenteo de Petén.',
        location:{
            lat: 17.2222094,
            lng: -89.623614
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'Coban',
        description: 'Un lugar agradable.',
        addres: 'Cabecera de Alta Verapaz.',
        location:{
            lat: 17.456455,
            lng: -89.546456
        },
        creatorId: 'u1'
    }
];

export const getPlaceById = (req, res, next) => {
    console.log("GET desde /api/places/");

    const placeId = req.params.pid;
    const place2Retrive = DUMMY_PLACES.find( p => {return p.id === placeId}); 

    if(!place2Retrive){
        return next(
            new HttpError('No se encontró el sitio especificado en el pid',
            404)
        ); //pasa el error al middlewre de errro handler.
    } else {
        res.json(place2Retrive);
    }
}

export const getPlaceByUserId = (req, res, next) => {
    console.log("GET desde /api/places/user/:uid/");

    const userId = req.params.uid;
    const place2Retrive = DUMMY_PLACES.filter(p => {return p.creatorId === userId});
    
    if(!place2Retrive){
        return next(
            new HttpError('No se encontraron los sitio para el usuario uid',
            404)
        ); //pasa el error al middlewre de errro handler.
    } else {
        res.json(place2Retrive);
    }
}

export const createPlace = (req, res, next) => {
    const {title, description, coordinates,
           address, creator} = req.body;

    const place2Create = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creatorId: creator
    }

    DUMMY_PLACES.push(place2Create);
    res.status(201).json(place2Create);
}

export const updatePlace = (req, res, next) => {
    const {title, description} = req.body; //datos desde el body req
    const placeId = req.params.pid; //datos desde ruta

    const place2Update = 
    {...DUMMY_PLACES.find(p => (p.id === placeId))};
    place2Update.title = title;
    place2Update.description = description;

    const placeIndex = DUMMY_PLACES.findIndex(p => (p.id === placeId));
    DUMMY_PLACES[placeIndex] = place2Update;
    res.status(200).json(place2Update);
}

export const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = 
        DUMMY_PLACES.filter(p => (p.id != placeId));
    res.status(200).json({mensaje: 'Sitio Eliminado.'})
}