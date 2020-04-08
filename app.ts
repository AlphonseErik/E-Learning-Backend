require('dotenv').config();

import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet'
import router from './src/router.root';
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json({ limit: '300kb' }));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('common'));
const clientDir = path.resolve(__dirname, '../public');

// Static router
app.use('/resources', express.static(process.env.NODE_ENV == 'production' ? clientDir : 'public'));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

// Router
if (process.env.NODE_ENV === 'production') {
    app.use('/api/v1', apiLimiter, router);
} else {
    app.use('/api/v1', router);
}


// Catch errors
app.use((req: any, res: any, next: any) => {
    const error: any = new Error();
    error.status = 404;
    error.message = 'NOT_FOUND_ROUTE';
    error.name = 'NotFoundException';
    next(error);
});

// Catch errors
app.use((req: any, res: any, next: any) => {
    const error: any = new Error();
    error.status = 404;
    error.message = 'NOT_FOUND_ROUTE';
    error.name = 'NotFoundException';
    next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
    res.status(error.status || 500);
    res.json({
        message: error.name ? error.name : 'Unknown error',
        errors: [
            {
                messages: error.message ? [error.message] : ['Unknown error']
            }
        ],
        status: error.status,
    });
});

// Mongodb connection
mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to database system.`);
});
app.listen(process.env.PORT, () => {
    console.log(`[HTTP] Server listening in port ${process.env.PORT}.`);
})