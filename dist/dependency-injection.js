"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependencies = void 0;
const app_notifications_provider_1 = __importDefault(require("./data/providers/local/app-notifications-provider"));
const device_tokens_provider_1 = __importDefault(require("./data/providers/local/device-tokens.provider"));
const firebase_admin_1 = __importDefault(require("./data/providers/remote/firebase-admin"));
const push_notifications_repository_impl_1 = __importDefault(require("./data/repositories-impl/push-notifications.repository-impl"));
const get_1 = __importDefault(require("./helpers/get"));
var Dependencies;
(function (Dependencies) {
    Dependencies["pushNotifications"] = "pushNotifications";
    Dependencies["users"] = "users";
})(Dependencies = exports.Dependencies || (exports.Dependencies = {}));
const injectDependencies = () => {
    const firebaseAdmin = new firebase_admin_1.default();
    const deviceTokensProvider = new device_tokens_provider_1.default([]);
    const appNotificationsProvider = new app_notifications_provider_1.default([]);
    get_1.default.put(Dependencies.pushNotifications, new push_notifications_repository_impl_1.default(firebaseAdmin, deviceTokensProvider, appNotificationsProvider));
};
exports.default = injectDependencies;
