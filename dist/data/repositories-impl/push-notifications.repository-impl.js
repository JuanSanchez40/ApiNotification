"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PushNotificationsRepositoryImpl {
    constructor(firebaseAdmin, deviceTokensProvider, appNotificationProvider) {
        this.firebaseAdmin = firebaseAdmin;
        this.deviceTokensProvider = deviceTokensProvider;
        this.appNotificationProvider = appNotificationProvider;
    }
    updateDeviceToken(id, value) {
        this.deviceTokensProvider.update(id, value);
    }
    getNotifications(userEmail) {
        return this.appNotificationProvider.getNotifications(userEmail);
    }
    markAsViewed(id) {
        this.appNotificationProvider.markAsViewed(id);
    }
    deleteDeviceToken(id) {
        this.deviceTokensProvider.deleteById(id);
    }
    sendNotificationToUser(notification) {
        const savedNotification = this.appNotificationProvider.create(notification);
        const tokens = this.deviceTokensProvider.getTokens(notification.userEmail);
        if (tokens.length > 0) {
            const unreadCount = this.appNotificationProvider.unreadCount(savedNotification.userEmail);
            this.firebaseAdmin
                .sendPushNotificationWithTokens(tokens, savedNotification, unreadCount)
                .then((invalidTokens) => {
                // console.log('invalidTokens', invalidTokens);
                for (const token of invalidTokens) {
                    this.deviceTokensProvider.deleteByValue(token);
                }
            });
        }
        return savedNotification;
    }
    saveDeviceToken(deviceToken) {
        return this.deviceTokensProvider.create(deviceToken).id;
    }
    sendNotificationToTopic(data) {
        this.firebaseAdmin.sendPushNotificationToTopic(data);
    }
}
exports.default = PushNotificationsRepositoryImpl;
