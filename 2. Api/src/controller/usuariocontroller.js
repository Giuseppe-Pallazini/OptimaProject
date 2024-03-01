import cookieParser from 'cookie-parser'
import path from 'path';
import express  from 'express';

import { fileURLToPath } from 'url';
import { generateToken, login } from "../repository/usuarioRepository.js";


import { Router } from "express";
const server = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cookieParser())
server.use(express.static(path.join(__dirname, '../../../3.site')));


//! logar no sistema
server.post("/login", async (req, resp) => {
    try {
        const { nome, senha } = req.body;

        const resposta = await login(nome, senha);

        if (!resposta) { //! Validar se o login existe
            throw new Error("Credenciais invalidas");
        }
        
        let token = await generateToken(resposta.id, resposta.nome);

        if(!token) {
            throw new Error('Erro ao gerar token')
        }
        
        resp.cookie('Authorization', token);

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