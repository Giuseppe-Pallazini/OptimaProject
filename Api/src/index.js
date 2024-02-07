import 'dotenv/config'

import usuariocontroller from './controller/usuariocontroller.js';
import veiculocontroller from './controller/veiculocontroller.js';
import pageController from './controller/pageController.js';

import cors from "cors"
import express from "express"

const server = express();

server.use(cors());


server.use(express.json());
server.use('/storage/fotos-carros', express.static('storage/fotos-carros'));

server.use(usuariocontroller);
server.use(veiculocontroller);
server.use(pageController)

server.listen(process.env.PORT, '0.0.0.0', () =>
        console.log(`API esta Online na Porta ${process.env.PORT}`));