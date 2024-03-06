import { con } from "./connection.js";

/*inserir veiculo*/
export async function inserirVeiculo(veiculo) {
    const comando =
        `INSERT INTO TB_VEICULO (DS_MODELO, DS_MARCA, VL_VALOR, DS_PLACA, DT_ANOFAB, VL_KM, NR_CODIGO, DS_CLASSE, IMG_VEICULO, DS_COR, NR_PORTAS, DS_TIPO)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const [resposta] = await con.query(comando, [veiculo.modelo, veiculo.marca, veiculo.valor, veiculo.placa, veiculo.anoFab, veiculo.km, veiculo.codigo, veiculo.classe, veiculo.img, veiculo.cor, veiculo.numPortas, veiculo.tipo]);
    veiculo.id = resposta.insertId;
    return veiculo;
}



/*Inserir imagem*/
export async function inserirImagem(imagem, id) {
    const comando =
        `UPDATE tb_veiculo
             SET img_veiculo =      ?
         WHERE id_veiculo =         ?`

    const [resposta] = await con.query(comando, [imagem, id])
    return resposta.affectedRows;
}





/*listar veiculos */
export async function listarTodosVeículos() {
    const comando =
        `select     id_veiculo      id,
                    ds_tipo         tipo,
                    ds_modelo       modelo,
                    ds_marca        marca,
                    vl_valor        valor,
                    ds_placa        placa,
                    dt_anofab       anoFabricacao,
                    vl_km           km,
                    nr_codigo       codigo,
                    ds_classe       classe,
                    img_veiculo     imagem,
                    ds_cor          cor,
                    nr_portas       qtdPortas
from    tb_veiculo;`

    const [linhas] = await con.query(comando);
    return linhas;
}


/*Buscar Veiculo*/
export async function buscarPorNome(nome, marca) {
    const comando =`
        select     id_veiculo       id,
                    ds_tipo         tipo,
                    ds_modelo       modelo,
                    ds_marca        marca,
                    vl_valor        valor,
                    ds_placa        placa,
                    dt_anofab       anoFabricacao,
                    vl_km           km,
                    nr_codigo       codigo,
                    ds_classe       classe,
                    img_veiculo     imagem,
                    ds_cor          cor,
                    nr_portas       qtdPortas
            from tb_veiculo
        where       ds_modelo like          ?
        or          ds_marca like           ?`
    const [linhas] = await con.query(comando, [`%${nome}%`, `%${marca}%`]);
    return linhas;
}




export async function alterarVeiculo(id, veiculo) {

    const comando = `
    update tb_veiculo 
    set ds_modelo   =       ?,
     ds_marca       =       ?,
     vl_valor       =       ?,
     ds_placa       =       ?,
     dt_anofab      =       ?,
     vl_km          =       ?,
     ds_classe      =       ?

    where id_veiculo =      ?`

    const [resposta] = await con.query(comando, [veiculo.modelo, veiculo.marca, veiculo.valor, veiculo.placa, veiculo.anofab, veiculo.km, veiculo.classe, id])
    return resposta.affectedRows;
}


/*Remover veiculo */
export async function removerVeiculo(id) {
    const comando =
        `   delete
                from    tb_veiculo
            where       id_veiculo =    ?`

    const [resposta] = await con.query(comando, id)
    return resposta.affectedRows
}


// Buscar por ID
export async function BuscarPorID(id) {
    const comando =
        `SELECT id_veiculo              id,
                ds_modelo                nome,
                ds_marca                marca,
                vl_valor                valor,
                ds_placa                placa,
                dt_anofab               anofab,
                vl_km      	            km,
                ds_classe               classe,
                img_veiculo             imagem
    FROM        tb_veiculo
    WHERE       id_veiculo     =         ? ` ;
    const [linhas] = await con.query(comando, id);
    return linhas[0];
}



export async function validateCodigoExist(codigo) {
    if (codigo == undefined) {
        return false
    }
    const comand =
        `SELECT     id_veiculo          id
    FROM            tb_veiculo
    WHERE           nr_codigo =         ?`;

    const [linhas] = await con.query(comand, codigo);
    return linhas[0];
}






export async function validateVehicle(novoVeiculo) {
    const error = new Error("Erro no processamento");
    const detalhesErros = {};
    error.detalhes = detalhesErros;
    detalhesErros.status = 403; // Status a ser retornado


    if (!novoVeiculo.tipo || novoVeiculo.tipo == "Tipo") {
        detalhesErros.message = "Tipo do veículo é obrigatório!"; //! Mensagem a ser retornada
        throw error;
    }
    else if (!novoVeiculo.modelo) {
        detalhesErros.message = "Modelo do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.marca) {
        detalhesErros.message = "Marca do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.valor || novoVeiculo.valor < 0 || novoVeiculo.valor == undefined) {
        detalhesErros.message = "Valor do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.placa) {
        detalhesErros.message = "Placa do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.anoFab || novoVeiculo.anoFab < 0 || novoVeiculo.anoFab == undefined) {
        detalhesErros.message = "Ano de fabricação do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.km) {
        detalhesErros.message = "Quilometragem do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.codigo) {
        detalhesErros.message = "Código do veículo é obrigatório!";
        throw error;
    }
    else if (await validateCodigoExist(novoVeiculo.codigo)) {
        detalhesErros.message = "Código já existe";
        throw error;
    }
    else if (novoVeiculo.codigo.length != 4) {
        detalhesErros.message = "Código precisa haver 4 números";
        throw error;
    }
    else if (!novoVeiculo.classe) {
        detalhesErros.message = "Classe do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.img) {
        detalhesErros.message = "Imagem do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.cor) {
        detalhesErros.message = "Cor do veículo é obrigatório!";
        throw error;
    }
    else if (!novoVeiculo.numPortas) {
        detalhesErros.message = "Número de portas do veículo é obrigatório!";
        throw error;
    }

}

