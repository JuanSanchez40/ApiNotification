import AppNotification from "../../db/models/app-notification";

export default class AppNotificationsProvider {
    constructor(readonly notifications: AppNotification[]){    }


    create(notification: AppNotification): AppNotification {
      const  tmp =   { ...notification, id:this.notifications.length + 1 };
      this.notifications.push(tmp);
      return tmp;
        
    }

    getNotifications(userEmail: string): AppNotification[] {
      return this.notifications.filter(e => e.userEmail == userEmail);
    }

    markAsViewed(id: number): void {
      const index = this.notifications.findIndex(e => e.id == id);
      if (index != -1) {
        this.notifications[index] = { ...this.notifications[index], viewed: true };
      }    
    }

    unreadCount(userEmail: string): number {
      return  this.notifications.filter(e=> e.userEmail == userEmail && e.viewed == false
      ).length;
    }

    delete(id: number): void {
        const index = this.notifications.findIndex(e => e.id == id);
        if (index != -1) {
          this.notifications.splice(index,1);
        }    
    }
}