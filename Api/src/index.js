import 'dotenv/config'

import usuariocontroller from './controller/usuariocontroller.js';
import veiculocontroller from './controller/veiculocontroller.js';
import pageController from './controller/pageController.js';

import session from 'express-session'
import cors from "cors"
import express from "express"

const server = express();

server.use(cors({
        origin: 'http://192.168.56.1:5000', // ou o endereço específico do seu aplicativo
        credentials: true
}));

server.use(session({
        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
        cookie: {
          sameSite: 'None', // ou 'Lax' ou 'Strict' dependendo do cenário
          secure: false, // Defina como true se estiver usando HTTPS
        },
      }));

      

server.options('/login', cors()); // Lida com solicitações OPTIONS para /login


server.use(express.json());
server.use('/storage/fotos-carros', express.static('storage/fotos-carros'));

server.use(usuariocontroller);
server.use(veiculocontroller);
server.use(pageController)

server.listen(process.env.PORT, '0.0.0.0', () =>
        console.log(`API esta Online na Porta ${process.env.PORT}`));