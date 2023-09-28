
export default interface AppNotification{
    id?: number;
    title: string;
    body: string;
    imageUrl?: string;
    type: string;
    content: string | object; // en bd el tipo de dato podria ser "any" para asi poder mandar un json
    createdAt: Date;
    viewed: boolean;
    userEmail: string; // utilizar el id del usuario para biencular un usuario
}