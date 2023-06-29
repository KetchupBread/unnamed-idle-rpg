import express, { Application } from 'express';
import { GameRouter } from './routes/GameRouter';

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.use('/game', GameRouter);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
