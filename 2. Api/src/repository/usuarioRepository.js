import { con } from "./connection.js";

import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;


export async function generateToken(id, nome) {
  const payload = {
    id,
    nome
  };
  const options = {
    expiresIn: '2h'
  };
  return jwt.sign(payload, secretKey, options);
}



//! middleware para o token (Redirecionar para o Login)
export async function verifyTokenLogin(req, res, next, redirectToLogin) {

  const token = req.cookies.Authorization;

  if (!token && redirectToLogin) {
    redirectLogin(res)
  } else if (!token && !redirectToLogin) {
    return res.status(401).send({ message: "Não foi possível completar sua solicitação" })
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    next() //- Token OK

  } catch (erro) { //! caso haja o token mas não seja válido

    if (redirectToLogin) {
      redirectLogin(res)
    } else {
      res.status(401).send({ message: "Sessão expirada" })
    }
  }
};

function redirectLogin(res) {
  return res.redirect('/login');
}

export async function login(nome, senha) {
  const comando = ` select 	id_funcionario      id,
                              ds_funcionario      nome
                      from tb_funcionario
                      where ds_funcionario  =     ?
                      and ds_senha     	    =     MD5(?) `
  const [linhas] = await con.query(comando, [nome, senha]);
  return linhas[0];
}