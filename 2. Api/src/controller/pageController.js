import { verifyTokenLogin } from '../repository/usuarioRepository.js'
import { fileURLToPath } from 'url';
import path from 'path';
import express  from 'express';


import { Router } from "express";
const server = Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname, '../../../3.site/pages')));

// Landing Page
server.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../3.site/pages/landingPage/landingPage.html'));
});


// Home
server.get('/home', (req, resp, next) => verifyTokenLogin(req, resp, next, true), (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../3.site/pages/home/home.html'));
});


// PageCarros
server.get('/pageCarros', (req, resp, next) => verifyTokenLogin(req, resp, next, true), (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../3.site/pages/pageCarros/pageCarros.html'));
});


// PageCarros2
server.get('/pageCarros2', (req, resp, next) => verifyTokenLogin(req, resp, next, true), (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../3.site/pages/pageCarros2/pageCarros.html'));
});


// Login
server.get('/login', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../3.site/pages/login/login.html'));
});


// Clientes
server.get('/clientes', (req, resp, next) => verifyTokenLogin(req, resp, next, true), (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../3.site/pages/clientes/clientes.html'));
});

export default server;