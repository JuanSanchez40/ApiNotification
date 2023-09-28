import PushNotificationsRepository, { PushNotificationTopicData } from "../../domain/repositories/push-notifications-repository";
import FirebaseAdmin from "../providers/remote/firebase-admin";
import DeviceToken from '../db/models/device-token';
import DeviceTokensProvider from "../providers/local/device-tokens.provider";
import AppNotification from "../db/models/app-notification";
import AppNotificationProvider from "../providers/local/app-notifications-provider";

export default class PushNotificationsRepositoryImpl
  implements PushNotificationsRepository 
{
  constructor(
    readonly firebaseAdmin: FirebaseAdmin, 
    readonly deviceTokensProvider: DeviceTokensProvider,
    readonly appNotificationProvider: AppNotificationProvider) {}
  
  updateDeviceToken(id: number, value: string): void {
   this.deviceTokensProvider.update(id, value);
  }
  
  getNotifications(userEmail: string): AppNotification[] {
      return this.appNotificationProvider.getNotifications(userEmail);
  }

  markAsViewed(id: number): void {
    this.appNotificationProvider.markAsViewed(id);
  }
  
  deleteDeviceToken(id: number): void {
    this.deviceTokensProvider.deleteById(id);
  }
  
  
  sendNotificationToUser(notification: AppNotification): AppNotification {
    const savedNotification = 
    this.appNotificationProvider.create(notification);
    const tokens = this.deviceTokensProvider.getTokens(notification.userEmail);
    if(tokens.length > 0){
  const unreadCount = this.appNotificationProvider.unreadCount(savedNotification.userEmail);
      this.firebaseAdmin
      .sendPushNotificationWithTokens(tokens, savedNotification, unreadCount )
      .then((invalidTokens) => {
        // console.log('invalidTokens', invalidTokens);
        for (const token of invalidTokens) {
          this.deviceTokensProvider.deleteByValue(token);
        }
      });
    }
    
    return savedNotification;
  }   

  saveDeviceToken(deviceToken: DeviceToken): number {
    return this.deviceTokensProvider.create(deviceToken).id!;
  }
    
  sendNotificationToTopic(data: PushNotificationTopicData): void {
    this.firebaseAdmin.sendPushNotificationToTopic(data);
  } 
  
}