import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import path from 'path';
import express  from 'express';

import { fileURLToPath } from 'url';
import { generateToken, login, verifyToken } from "../repository/usuarioRepository.js";


import { Router } from "express";
const server = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cookieParser())
server.use(express.static(path.join(__dirname, '../../../site')));

const secretKey = process.env.SECRET_KEY


// Rota para a página /login
server.get('/login', (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/login/login.html'));
});

//! logar no sistema
server.post("/login", async (req, resp) => {
    try {
        const { nome, senha } = req.body;

        const resposta = await login(nome, senha);

        if (!resposta) { //! Validar se o login existe
            throw new Error("Credenciais invalidas");
        }
        
        let token = await generateToken(resposta.id, resposta.nome);
        resp.cookie('token', token, { httpOnly: true, maxAge: 120000 });

        resp.send({
             id: resposta.id,
             nome: resposta.nome,
             token: token
        });

    } catch (err) { 
        resp.status(401).send({
            erro: err.message
        });
    }
})

export default server;