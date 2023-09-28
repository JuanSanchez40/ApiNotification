import {Request, Response} from 'express'
import { Dependencies } from '../../../dependency-injection';
import Get from '../../../helpers/get';
import PushNotificationsRepository from "../../../domain/repositories/push-notifications-repository";
import AppNotification from '../../../data/db/models/app-notification';
const faker = require('faker');

export default class ChatController {

    private pushNotificationsRepository = Get.find<PushNotificationsRepository>(
        Dependencies.pushNotifications
    );


    sendMessage = (req: Request, res: Response) => {
        try {
            const { title,chatId, value, type, email, imageUrl } = req.body as MessageBody;
            if(!title || !chatId || !value || !type || !email ){
                throw {code: 400, message: 'invalid body' };
            }
            const notification: AppNotification = {
                userEmail: email,
                title: `Notificación para:  ${title}`,
                body: value,
                imageUrl: imageUrl,
                type: 'CHAT',
                content: {
                    chatId,
                    value,
                    type,
                    createdAt: new Date(),
                },
                createdAt: new Date(),
                viewed: false,
            };
            
            
            this.pushNotificationsRepository.sendNotificationToUser(notification);
            res.send('ok');
        } catch (e: any) {
            res.status(e.code ?? 500).send(e.message);
        }
    };
}

interface MessageBody {
    title: string;
    chatId: number;
    value: string;
    imageUrl?: string;
    email: string;
    type: 'text' | 'image' | 'audio';
}