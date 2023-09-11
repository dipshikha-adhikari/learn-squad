import { createListing} from "../controllers/listings/createListing"
import { deleteListingById } from "../controllers/listings/deleteListingById"
import { getAllListings } from "../controllers/listings/getAllListings"
import { getListingById } from "../controllers/listings/getListingById"
import { updateListing } from "../controllers/listings/updateListing"
const verifyToken = require('../middlewares/verifyToken')

const express = require('express')
const router = express.Router()

router.get('/', getAllListings)
router.post('/',verifyToken, createListing)
router.put('/:id', verifyToken, updateListing)
router.get('/:id', getListingById)
router.delete('/:id',verifyToken, deleteListingById)

module.exports = router