import { verifyToken } from '../repository/usuarioRepository.js'
import { fileURLToPath } from 'url';
import path from 'path';
import express  from 'express';


import { Router } from "express";
const server = Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname, '../../../site/pages')));

// Landing Page
server.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/pages/landingPage/landingPage.html'));
});


// Home
server.get('/home' , (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/pages/home/home.html'));
});


// server.get('home/home.js', verifyToken, (req,resp) => {
//     resp.sendFile(path.join(__dirname, '../../../site/pages/login/login.html'));
// })


// PageCarros
server.get('/pageCarros', verifyToken, (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/pages/pageCarros/pageCarros.html'));
});


// Login
server.get('/login', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/pages/login/login.html'));
});


// Clientes
server.get('/clientes', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/pages/clientes/clientes.html'));
});

export default server;