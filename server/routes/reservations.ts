import { createReservation } from '../controllers/reservations/createReservation';
import { deleteReservationById } from '../controllers/reservations/deleteReservationById';
import { getAllReservations } from '../controllers/reservations/getAllReservations';
import { getReservationById } from '../controllers/reservations/getReservationById';
import { getReservationsByListingId } from '../controllers/reservations/getReservationsByListingId';


const express = require('express')
const router = express.Router()
const verifyToken  = require('../middlewares/verifyToken')

router.get('/', getAllReservations)
router.get('/:id', getReservationById)
router.get('/listing/:id', getReservationsByListingId)
router.post('/',verifyToken, createReservation)
router.delete('/:id',verifyToken, deleteReservationById)

module.exports = router