"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notifications_controller_1 = __importDefault(require("../../controllers/v1/notifications-controller"));
const validate_auth_1 = require("../../middlewares/validate-auth");
exports.default = () => {
    const router = express_1.default.Router();
    const controller = new notifications_controller_1.default();
    router.get('/get', validate_auth_1.authValidate, controller.getNotifications);
    router.post('/mark-as-viewed', validate_auth_1.authValidate, controller.markAsViewed);
    router.post('/update-token', validate_auth_1.authValidate, controller.updateDeviceToken);
    return router;
};
