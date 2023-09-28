"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promos_router_1 = __importDefault(require("./promos-router"));
const authentication_router_1 = __importDefault(require("./authentication-router"));
const chat_router_1 = __importDefault(require("./chat-router"));
const notifications_router_1 = __importDefault(require("./notifications-router"));
exports.default = (app) => {
    app.get('/', (req, res) => res.send('HELLO'));
    app.use('/api/v1/promos', (0, promos_router_1.default)());
    app.use('/api/v1/auth', (0, authentication_router_1.default)());
    app.use('/api/v1/chat', (0, chat_router_1.default)());
    app.use('/api/v1/notifications', (0, notifications_router_1.default)());
};
