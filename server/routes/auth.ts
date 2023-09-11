import { handleLogin } from '../controllers/auth/handleLogin';
import { handleRegister } from '../controllers/auth/handleRegister';

const express = require('express')
const router = express.Router()

router.post('/register', handleRegister)
router.post('/login', handleLogin)

module.exports = router