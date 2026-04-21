import cors from 'cors';
import express from 'express';

export const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
