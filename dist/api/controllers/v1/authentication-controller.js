"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dependency_injection_1 = require("../../../dependency-injection");
const get_1 = __importDefault(require("../../../helpers/get"));
class AuthenticationController {
    constructor() {
        this.pushNotificationsRepository = get_1.default.find(dependency_injection_1.Dependencies.pushNotifications);
        this.login = (req, res) => {
            var _a;
            try {
                const { email, pushNotificationToken } = req.body;
                //
                if (!email) {
                    throw { code: 400, message: 'ivalid body' };
                }
                let deviceTokenId;
                if (pushNotificationToken) {
                    const deviceToken = {
                        value: pushNotificationToken,
                        userEmail: email,
                    };
                    deviceTokenId =
                        this.pushNotificationsRepository.saveDeviceToken(deviceToken);
                }
                const expiresIn = 60 * 60; // se comenta esta linea para  que no expire token en pruebas
                const token = jsonwebtoken_1.default.sign({
                    email,
                    deviceTokenId,
                }, process.env.JWT_SECRET, {
                    expiresIn, // se comenta esta linea para  que no expire token en pruebas
                });
                res.send({ token, expiresIn }); // , expiresIn se comenta esta linea para  que no expire token en pruebas
            }
            catch (e) {
                res.status((_a = e.code) !== null && _a !== void 0 ? _a : 500).send(e.message);
            }
        };
        this.logOut = (req, res) => {
            var _a;
            try {
                const authToken = req.headers.token;
                if (!authToken) {
                    throw { code: 400, message: 'missing header token' };
                }
                const payload = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET, {
                    ignoreExpiration: true,
                });
                if (payload.deviceTokenId != undefined) {
                    console.log('payload inside', payload);
                    this.pushNotificationsRepository.deleteDeviceToken(payload.deviceTokenId);
                }
                ;
                //
                res.send("ok");
            }
            catch (e) {
                res.status((_a = e.code) !== null && _a !== void 0 ? _a : 500).send(e.message);
            }
        };
    }
}
exports.default = AuthenticationController;
