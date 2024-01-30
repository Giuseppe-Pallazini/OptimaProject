import multer from 'multer'
import path from 'path'
import cookieParser from 'cookie-parser'
import express from 'express'
import { inserirImagem, removerVeiculo, inserirVeiculo, listarTodosVeículos, alterarVeiculo, buscarPorNome, BuscarPorID, validateVehicle } from '../repository/veiculoRepository.js';
import { verifyToken } from '../repository/usuarioRepository.js'
import { fileURLToPath } from 'url';


import { Router } from 'express'
const server = Router();
const upload = multer({ dest: 'storage/fotos-carros' });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cookieParser())
server.use(express.static(path.join(__dirname, '../../../site')));


//Adicionar Veiculo
server.post('/veiculo', verifyToken, async (req, resp) => {
    try {
        const novoVeiculo = req.body;

        await validateVehicle(novoVeiculo)
  
        const veiculoinserido = await inserirVeiculo(novoVeiculo);
  
        resp.send(veiculoinserido);
  
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        });
    }
})


//Inserir Imagem 
server.put('/veiculo/:id/capa', upload.single('capa'), async (req, resp) => {
    try {
        if (!req.file)
            throw new Error('A imagem não pode ser salva!')

        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await inserirImagem(imagem, id);
        if (resposta != 1)
            throw new Error('A imagem não pode ser salva!')

        resp.status(204).send()
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }

})


//Listar Veiculos
server.get('/veiculo', verifyToken, async (req, resp) => {
    try {
        const resposta = await listarTodosVeículos();
        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


//Buscar por nome
server.get('/veiculo/busca', verifyToken, async (req, resp) => {
    try {
        const { nome, marca } = req.body;
        const resposta = await buscarPorNome(nome, marca);

        if (!resposta) {
            throw new Error('Veiculo não localizado.')
        }
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


// alterar veiculo
server.put('/veiculo/:id', verifyToken, async (req, resp) => {
    try {
        const { id } = req.params;
        const veiculo = req.body;

        await validateVehicle(veiculo)

        const resposta = await alterarVeiculo(id, veiculo);
        if (resposta != 1)
            throw new Error("Veículo não pode ser alterado")

        resp.status(200).send({ message: "Veículo alterado com sucesso."});

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//Deletar Veiculo
server.delete('/veiculo/:id', verifyToken, async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await removerVeiculo(id);
        if (resposta != 1)
            throw new Error("Veículo não pode ser removido")

        resp.status(200).send({message: "Veículo removido com sucesso!"})
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

//Buscar por ID
server.get('/veiculo/:id', verifyToken, async (req, resp) => {
    try {
        const id = Number(req.params.id);

        if(!id) {
            throw new Error("Número não identificado");
        }
        
        const resposta = await BuscarPorID(id);

        if (!resposta) {
                resp.status(400).send({message: 'Veículo não localizado'})
        }
        resp.send(resposta);
    } catch (err) {
        resp.status(404).send({message: err.message});
    }
})


export default server