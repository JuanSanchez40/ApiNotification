import * as admin from 'firebase-admin';
import { credential, app, initializeApp, messaging } from 'firebase-admin';
import { PushNotificationTopicData } from '../../../domain/repositories/push-notifications-repository';
import isJSon from '../../../helpers/is-json';
import AppNotification from '../../db/models/app-notification';

const googleServiceJson = require('../../../../sdk.json');

export default class FirebaseAdmin {
    
    private messaging: messaging.Messaging;

    constructor() {  
      const _credential = credential.cert(googleServiceJson);
      const app = admin.initializeApp({ credential: _credential });
      this.messaging = app.messaging();  
    }
  
    async sendPushNotificationToTopic(input: PushNotificationTopicData): Promise<void> {
      try {
        const notification: {
          title: string;
          body: string;
          imageUrl: string;
          sound: string;
          color: string;
        } = {
          title: input.title,
          body: input.body,
          imageUrl: input.imageUrl,
          sound: 'notification.mp3',
          color: '#9c27b0',
        };
  
        await this.messaging.sendToTopic(input.topic, {
          data: input.data,
          notification,
        });
      } catch (e) {
        console.warn(e);
      }
    } 
    async sendPushNotificationWithTokens(
      tokens: string[],
      appNotification: AppNotification,
      unreadCount: number 
      ): Promise<string[]> {
      try {
      const response = await  this.messaging.sendMulticast({
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
            constent: isJSon(appNotification.content) ?? appNotification.content.toString(),
          }
        });
       const invalidTokens: string[]= [];

       
        if (response.failureCount > 0) {
        for (let i = 0; i < response.responses.length; i++){
          const item = response.responses[i];
          if (item.error){
            invalidTokens.push(tokens[i]);
          }
        }
        }
        console.log('invilidtokens', invalidTokens);
        return invalidTokens;
      } catch (e) {
        console.warn(e);
        return [];
      }
    }
}