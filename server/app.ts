import express, { type Express } from 'express';

export const app: Express = express();

app.get('/hello', (req, res) => {
  console.log('HI');
  res.send('HI');
});
