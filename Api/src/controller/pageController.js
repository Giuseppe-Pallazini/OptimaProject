import { verifyToken } from '../repository/usuarioRepository.js'
import { fileURLToPath } from 'url';
import path from 'path';
import express  from 'express';


import { Router } from "express";
const server = Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname, '../../../site/landingPage')));

server.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/landingPage/landingPage.html'));
})

server.get('/home', verifyToken ,(req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/home/home.html'));
})

export default server;