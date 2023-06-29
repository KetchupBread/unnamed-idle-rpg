import express from 'express';
import path from 'path';

export const GameRouter = express.Router();

GameRouter.use('/', express.static(path.join(__dirname, '../../dist/game/index.html')));
GameRouter.use('/bundle.js', express.static(path.join(__dirname, '../../dist/game/bundle.js')));
GameRouter.use('/styles.css', express.static(path.join(__dirname, '../../dist/game/styles.css')));
