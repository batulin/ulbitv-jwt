import express from "express";
import {getUsers, login, logout, refresh, registration} from "../controllers/user.controller.js";
import {authHandler} from "../middleWare/auth.middleware.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', registration);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.get('/users', authHandler, getUsers);

export default router;