import express from 'express';
import bodyParser from 'body-parser';
import clarifyRouter from './routes/clarifyRoutes';

const app = express();

app.use(bodyParser.json());
app.use(clarifyRouter);

export default app;
