"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = require("../../../dependency-injection");
const faker = require('faker');
const get_1 = __importDefault(require("../../../helpers/get"));
class PromosController {
    constructor() {
        this.pushNotificationsRepository = get_1.default.find(dependency_injection_1.Dependencies.pushNotifications);
        this.sendPromo = (req, res) => {
            const { title, body, imageUrl } = req.body;
            this.pushNotificationsRepository.sendNotificationToTopic({
                topic: 'promos',
                title,
                body,
                imageUrl,
                data: {
                    type: 'PROMO',
                    content: JSON.stringify({
                        productId: faker.datatype.number(200),
                        productName: faker.lorem.sentence(),
                    }),
                }
            });
            res.send('Ok');
        };
    }
}
exports.default = PromosController;
