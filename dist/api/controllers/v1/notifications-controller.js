"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_injection_1 = require("../../../dependency-injection");
const get_1 = __importDefault(require("../../../helpers/get"));
class NotificationsController {
    constructor() {
        this.pushNotificationsRepository = get_1.default.find(dependency_injection_1.Dependencies.pushNotifications);
        this.getNotifications = (req, res) => {
            const notifications = this.pushNotificationsRepository.getNotifications(req.session.email);
            res.send(notifications);
        };
        this.updateDeviceToken = (req, res) => {
            var _a;
            try {
                const { pushNotificationToken } = req.body;
                if (!pushNotificationToken) {
                    throw { code: 400, message: 'invalid body' };
                }
                const { deviceTokenId } = req.session;
                if (deviceTokenId != undefined) {
                    this.pushNotificationsRepository.updateDeviceToken(deviceTokenId, pushNotificationToken);
                }
                res.send('ok');
            }
            catch (e) {
                res.status((_a = e.code) !== null && _a !== void 0 ? _a : 500).send(e.message);
            }
        };
        this.markAsViewed = (req, res) => {
            var _a;
            try {
                const { notificationId } = req.body;
                if (notificationId == undefined) {
                    throw { code: 400, message: 'invalid body' };
                }
                this.pushNotificationsRepository.markAsViewed(notificationId);
                res.send('ok');
            }
            catch (e) {
                res.status((_a = e.code) !== null && _a !== void 0 ? _a : 500).send(e.message);
            }
        };
    }
}
exports.default = NotificationsController;
