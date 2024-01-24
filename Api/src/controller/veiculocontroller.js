import multer from 'multer'
import path from 'path'
import cookieParser from 'cookie-parser'
import express from 'express'
import { inserirImagem, removerVeiculo, inserirVeiculo, listarTodosVeículos, alterarVeiculo, buscarPorNome, BuscarPorID } from '../repository/veiculoRepository.js';
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
server.post('/veiculo', async (req, resp) => {
    try {
        const novoVeiculo = req.body;
        if (!novoVeiculo.modelo.trim())
            throw new Error('Modelo do veiculo é obrigatorio!');
        if (!novoVeiculo.marca.trim())
            throw new Error('Marca do veiculo é obrigatorio!');
        if (novoVeiculo.valor < 0 || undefined)
            throw new Error('Valor do veiculo é obrigatorio!');
        if (!novoVeiculo.placa.trim())
            throw new Error('Placa do veiculo é obrigatorio!');
        if (novoVeiculo.anofab < 0 || undefined)
            throw new Error('Ano de Fabricação do veiculo é obrigatorio!');
        if (!novoVeiculo.km)
            throw new Error('Quilometragem do veiculo é obrigatorio!');
        if (!novoVeiculo.classe.trim())
            throw new Error('Classe do veiculo é obrigatorio!');

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


server.get('/pageCarros', verifyToken, (req, resp) => {
    resp.sendFile(path.join(__dirname, '../../../site/pageCarros/pageCarros.html'));
});


//Listar Veiculos
server.get('/veiculo', async (req, resp) => {
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
server.get('/veiculo/busca', async (req, resp) => {
    try {
        const { nome } = req.query;
        const resposta = await buscarPorNome(nome);

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
server.put('/veiculo', async (req, resp) => {
    try {
        const id = req.params;
        const veiculo = req.body;

        if (!veiculo.modelo.trim())
            throw new Error('Modelo do veiculo é obrigatorio!');
        if (!veiculo.marca.trim())
            throw new Error('Marca do veiculo é obrigatorio!');
        if (veiculo.valor.trim() < 0)
            throw new Error('Valor do veiculo é obrigatorio!');
        if (!veiculo.placa.trim())
            throw new Error('Placa do veiculo é obrigatorio!');
        if (veiculo.anofab < 0 || undefined)
            throw new Error('Ano de Fabricação do veiculo é obrigatorio!');
        if (!veiculo.km.trim())
            throw new Error('Quilometragem do veiculo é obrigatorio!');
        if (!veiculo.classe.trim())
            throw new Error('Classe do veiculo é obrigatorio!');

        const resposta = await alterarVeiculo(id, veiculo);
        if (resposta != 1)
            throw new Error("Veículo não pode ser alterado")

        else
            resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//Deletar Veiculo
server.delete('/veiculo/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await removerVeiculo(id);
        if (resposta != 1)
            throw new Error("Veículo não pode ser removido")

        resp.status(204).send()
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

//Buscar por ID
server.get('/veiculo/:id', async (req, resp) => {
    try {
        const lol = Number(req.params.id);
        const resposta = await BuscarPorID(lol);

        if (!resposta) {
            throw new Error('Veiculo não localizado.')
        }
        resp.send(resposta);
    } catch (err) {
        console.log(err)
    }
})


export default server