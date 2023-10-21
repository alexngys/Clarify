import express from 'express';
import bodyParser from 'body-parser';
import clarifyRouter from './routes/clarifyRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(clarifyRouter);

export default app;
