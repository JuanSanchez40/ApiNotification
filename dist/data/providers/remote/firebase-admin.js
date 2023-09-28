"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const firebase_admin_1 = require("firebase-admin");
const is_json_1 = __importDefault(require("../../../helpers/is-json"));
const googleServiceJson = require('../../../../sdk.json');
class FirebaseAdmin {
    constructor() {
        const _credential = firebase_admin_1.credential.cert(googleServiceJson);
        const app = admin.initializeApp({ credential: _credential });
        this.messaging = app.messaging();
    }
    sendPushNotificationToTopic(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = {
                    title: input.title,
                    body: input.body,
                    imageUrl: input.imageUrl,
                    sound: 'notification.mp3',
                    color: '#9c27b0',
                };
                yield this.messaging.sendToTopic(input.topic, {
                    data: input.data,
                    notification,
                });
            }
            catch (e) {
                console.warn(e);
            }
        });
    }
    sendPushNotificationWithTokens(tokens, appNotification, unreadCount) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.messaging.sendMulticast({
                    tokens,
                    notification: {
                        title: appNotification.title,
                        body: appNotification.body,
                        imageUrl: appNotification.imageUrl,
                    },
                    apns: {
                        payload: {
                            aps: {
                                sound: 'notification.mp3',
                                badge: unreadCount,
                                contentAvailable: true,
                            }
                        }
                    },
                    android: {
                        priority: 'high',
                        notification: {
                            sound: 'notification.mp3',
                            color: '#9c27b0',
                            channelId: 'push_notifications',
                        },
                    },
                    data: {
                        type: appNotification.type,
                        unreadCount: unreadCount.toString(),
                        constent: (_a = (0, is_json_1.default)(appNotification.content)) !== null && _a !== void 0 ? _a : appNotification.content.toString(),
                    }
                });
                const invalidTokens = [];
                if (response.failureCount > 0) {
                    for (let i = 0; i < response.responses.length; i++) {
                        const item = response.responses[i];
                        if (item.error) {
                            invalidTokens.push(tokens[i]);
                        }
                    }
                }
                console.log('invilidtokens', invalidTokens);
                return invalidTokens;
            }
            catch (e) {
                console.warn(e);
                return [];
            }
        });
    }
}
exports.default = FirebaseAdmin;
