import jwt from "jsonwebtoken";
import { promisify } from "util";

import AuthException from "./AuthException.js";
import { API_SECRET } from "../constants/secrets.js";
import {
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR,
} from "../constants/httpStatus.js";

const emptySpace = " ";

export default async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        if (!authorization) {
            throw new AuthException(
                UNAUTHORIZED,
                "Acess token was not informed."
            );
        }
        let accessToken = authorization;
        if (accessToken.includes(emptySpace)) {
            accessToken = accessToken.split(emptySpace)[1];
        } else {
            accessToken = authorization;
        }
        const decoded = await promisify(jwt.verify)(accessToken, API_SECRET);
        req.authUser = decoded.authUser;
        return next();
    } catch (err) {
        const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
        return res.status(status).json({
            status: err.status ? err.status : INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
};
