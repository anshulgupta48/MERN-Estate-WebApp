import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return next(errorHandler(403, 'Forbidden'));
        }
        req.user = user;
        next();
    });
}