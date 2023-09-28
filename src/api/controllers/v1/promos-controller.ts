
import { Request, Response } from 'express';
import PushNotificationsRepository from '../../../domain/repositories/push-notifications-repository';
import { Dependencies } from '../../../dependency-injection';
const faker = require('faker');
import Get from '../../../helpers/get';


export default class PromosController {

    private pushNotificationsRepository = Get.find<PushNotificationsRepository>(
        Dependencies.pushNotifications
    );
   
    sendPromo = (req: Request, res: Response) => {
        const { title, body, imageUrl } = req.body as SendPromoBody;
        this.pushNotificationsRepository.sendNotificationToTopic({
           topic: 'promos', 
           title,
           body,
           imageUrl,
           data:{
            type: 'PROMO',
            
            content: JSON.stringify({
                productId: faker.datatype.number(200),
                productName: faker.lorem.sentence(),
            }),
           }
        });   
        res.send('Ok')
    };
}

interface SendPromoBody {
    title: string;
    body: string;
    imageUrl?: string;
}