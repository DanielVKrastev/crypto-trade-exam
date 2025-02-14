import { Router } from "express";
import authService from "../services/auth-service.js";
import { AUTH_COOKIE_NAME } from "../constants-config.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-unitls.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try{
        const token = await authService.register(userData);
        res.cookie(AUTH_COOKIE_NAME, token, { expiresIn: '2h', httpOnly: true });
        res.redirect('/');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('auth/register', { error, user: userData });
    }
})

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try{
        const token = await authService.login(email, password);
        res.cookie(AUTH_COOKIE_NAME, token, { expiresIn: '2h', httpOnly: true });
        res.redirect('/');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('auth/login', { error, user: { email } });
    }
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
})

export default authController;