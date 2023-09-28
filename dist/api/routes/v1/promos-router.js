"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promos_controller_1 = __importDefault(require("../../controllers/v1/promos-controller"));
exports.default = () => {
    const router = express_1.default.Router();
    const controller = new promos_controller_1.default();
    router.post('/send-promo', controller.sendPromo);
    return router;
};
