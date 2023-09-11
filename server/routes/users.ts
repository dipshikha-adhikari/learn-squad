import { getAllUsers } from "../controllers/user/getAllUsers";
import { getCurrentUser } from "../controllers/user/getCurrentUser";
import { getUserById } from "../controllers/user/getUserById";

const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')

router.get("/",  getAllUsers);
router.get("/current", verifyToken, getCurrentUser);
router.get("/:id",  getUserById);

module.exports = router;
