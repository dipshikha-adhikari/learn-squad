import { deleteFavorite } from "../controllers/favorites/deleteFavorite"
import { createFavorite } from "../controllers/favorites/createFavorite"
import { getFavorites } from "../controllers/favorites/getFavorites"

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, getFavorites)
router.post('/',verifyToken, createFavorite)
router.delete('/:id',verifyToken, deleteFavorite)

module.exports = router