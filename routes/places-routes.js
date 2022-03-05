import express from "express";

//importamos controler.
import {getPlaceById,
        getPlaceByUserId, 
        createPlace,
        updatePlace,
        deletePlace} 
        from "../controllers/places-controller.js";

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlaceByUserId);

router.post('/', createPlace);

router.patch('/:pid', updatePlace);

router.delete('/:pid', deletePlace);

export default router;