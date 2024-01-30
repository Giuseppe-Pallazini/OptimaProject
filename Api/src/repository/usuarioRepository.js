import { con } from "./connection.js";

import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;


export async function generateToken(id, nome) {
    const payload = {
        id,
        nome
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, secretKey, options);
}


//! middleware para o token
export async function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      console.log('Token n existe')
      return res.redirect('/login'); // Token não existe
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      next() // Token OK
    } catch (erro) {
      return res.redirect('/login'); // caso haja o token mas não seja válido
    }
  };

export async function login(nome, senha) {
    const comando = `select 	id_funcionario     id,
                                ds_funcionario     nome
                from   tb_funcionario
                    where  ds_funcionario  = ?
                    and ds_senha     	   =  MD5(?) `
    const [linhas] = await con.query(comando, [nome, senha]);
    return linhas[0];
}