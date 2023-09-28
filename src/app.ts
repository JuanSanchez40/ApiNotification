import express, { Application } from 'express';
import { json } from 'body-parser';
import apiV1 from './api/routes/v1';
import injectDependencies from './dependency-injection';
import cors from 'cors';

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:8081'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

export default class App {
    private app: Application = express();

    async initialize(): Promise<void> {
        this.app.use(json());
        this.app.use(cors(options));
        injectDependencies();
        apiV1(this.app);  
        const PORT = process.env.PORT ?? 8000;
        this.app.listen(PORT, () => {
            console.log(`running on ${PORT}`)
        });
    }
}