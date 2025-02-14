import jwt from 'jsonwebtoken';

import { 
    AUTH_COOKIE_NAME, 
    JWT_SECRET 
} from "../constants-config.js";

//Async jwt.verify with callback func
export const auth = (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if( ! token){
        return next();
    }
    
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if(err){
            res.clearCookie(AUTH_COOKIE_NAME);
            return res.redirect('/auth/login');
        }

        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    });

};

export const isAuth = (req, res, next) => {

    if( ! req.user){
        return res.redirect('/auth/login');
    }

    next();
};