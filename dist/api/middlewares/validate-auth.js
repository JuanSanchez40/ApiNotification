"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authValidate = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            throw new Error('missing header token');
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.session = payload;
        next();
    }
    catch (e) {
        res.status(401).send('access denied');
    }
};
exports.authValidate = authValidate;
