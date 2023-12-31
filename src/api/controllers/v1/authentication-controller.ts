import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import DeviceToken from "../../../data/db/models/device-token";
import PushNotificationsRepository from "../../../domain/repositories/push-notifications-repository";
import { Dependencies } from "../../../dependency-injection";
import Get from "../../../helpers/get";

export default class AuthenticationController {
    
    private pushNotificationsRepository = Get.find<PushNotificationsRepository>(
        Dependencies.pushNotifications
    );

    login = (req: Request, res: Response) => {
        try {
            const { 
            email, 
            pushNotificationToken
           }: { email: string; pushNotificationToken?: string } = req.body;
            //

            if(!email){
                throw{ code: 400, message: 'ivalid body'};
            }
            let deviceTokenId: number | undefined;

            if(pushNotificationToken){
                const deviceToken: DeviceToken = {
                    value: pushNotificationToken,
                    userEmail: email,
                };
              deviceTokenId =
                this.pushNotificationsRepository.saveDeviceToken(deviceToken);
            }
             const expiresIn = 60 * 60; // se comenta esta linea para  que no expire token en pruebas
            const token = jwt.sign(
            {
                email,
                deviceTokenId,
            },
            process.env.JWT_SECRET,
             {
               expiresIn,    // se comenta esta linea para  que no expire token en pruebas
             }
            );
            res.send({ token, expiresIn });   // , expiresIn se comenta esta linea para  que no expire token en pruebas
        } catch (e: any) {
            res.status(e.code ?? 500).send(e.message);            
        }
    };

    logOut = (req: Request, res: Response) => {
        try {
            const authToken = req.headers.token as string;
            if(!authToken){
                throw { code: 400, message: 'missing header token'};
            }

            const payload = jwt.verify(authToken, process.env.JWT_SECRET, {
                ignoreExpiration: true,
            }) as { email: string, deviceTokenId?: number };

            
            if(payload.deviceTokenId != undefined){
                console.log('payload inside', payload);
                this.pushNotificationsRepository.deleteDeviceToken(
                   payload.deviceTokenId
                );
            };
            //

            res.send("ok");
        } catch (e: any) {
            res.status(e.code ?? 500).send(e.message);            
        }
    };
}