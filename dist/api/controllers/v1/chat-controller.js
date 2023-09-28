"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = require("../../../dependency-injection");
const get_1 = __importDefault(require("../../../helpers/get"));
const faker = require('faker');
class ChatController {
    constructor() {
        this.pushNotificationsRepository = get_1.default.find(dependency_injection_1.Dependencies.pushNotifications);
        this.sendMessage = (req, res) => {
            var _a;
            try {
                const { title, chatId, value, type, email, imageUrl } = req.body;
                if (!title || !chatId || !value || !type || !email) {
                    throw { code: 400, message: 'invalid body' };
                }
                const notification = {
                    userEmail: email,
                    title: `Notificación para:  ${title}`,
                    body: value,
                    imageUrl: imageUrl,
                    type: 'CHAT',
                    content: {
                        chatId,
                        value,
                        type,
                        createdAt: new Date(),
                    },
                    createdAt: new Date(),
                    viewed: false,
                };
                this.pushNotificationsRepository.sendNotificationToUser(notification);
                res.send('ok');
            }
            catch (e) {
                res.status((_a = e.code) !== null && _a !== void 0 ? _a : 500).send(e.message);
            }
        };
    }
}
exports.default = ChatController;
