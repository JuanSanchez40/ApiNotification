"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppNotificationsProvider {
    constructor(notifications) {
        this.notifications = notifications;
    }
    create(notification) {
        const tmp = Object.assign(Object.assign({}, notification), { id: this.notifications.length + 1 });
        this.notifications.push(tmp);
        return tmp;
    }
    getNotifications(userEmail) {
        return this.notifications.filter(e => e.userEmail == userEmail);
    }
    markAsViewed(id) {
        const index = this.notifications.findIndex(e => e.id == id);
        if (index != -1) {
            this.notifications[index] = Object.assign(Object.assign({}, this.notifications[index]), { viewed: true });
        }
    }
    unreadCount(userEmail) {
        return this.notifications.filter(e => e.userEmail == userEmail && e.viewed == false).length;
    }
    delete(id) {
        const index = this.notifications.findIndex(e => e.id == id);
        if (index != -1) {
            this.notifications.splice(index, 1);
        }
    }
}
exports.default = AppNotificationsProvider;
