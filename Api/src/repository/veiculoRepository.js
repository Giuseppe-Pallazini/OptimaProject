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
	         SET img_veiculo       = ?
         WHERE id_veiculo = ? `

    const [resposta] = await con.query(comando, [imagem, id])
    return resposta.affectedRows;
}





/*listar veiculos */
export async function listarTodosVeículos() {
    const comando =
        `select 	id_veiculo          id,
                ds_modelo               modelo,
                ds_marca                marca,
                vl_valor                valor,
                ds_placa 	 	        placa,
                dt_anofab               anofab,
                vl_km      	            km,
                ds_classe 		        classe,
                img_veiculo             imagem
    from        tb_veiculo`

    const [linhas] = await con.query(comando);
    return linhas;
}





/*Buscar Veiculo*/
export async function buscarPorNome(nome, marca) {
    const comando =
        `select 	id_veiculo              id,
                    ds_modelo               modelo,
                    ds_marca                marca,
                    vl_valor                valor,
                    ds_placa                placa,
                    dt_anofab               anofab,
                    vl_km                   km,
                    ds_classe               classe,
                    img_veiculo             imagem
       from tb_veiculo
	            where ds_modelo like ?
                  or ds_marca like ? `

    const [linhas] = await con.query(comando, [`%${nome}%`, `%${marca}%`]);
    return linhas;
}




export async function alterarVeiculo(id, veiculo) {

    const comando = `
    update tb_veiculo 
    set ds_modelo    =      ?,
     ds_marca        =      ?,
     vl_valor        =      ?,
     ds_placa 	 	 =      ?,
     dt_anofab       =	    ?,
     vl_km      	 =      ?,
     ds_classe 		 =      ?

    where id_veiculo = ?`

    const [resposta] = await con.query(comando, [veiculo.modelo, veiculo.marca, veiculo.valor, veiculo.placa, veiculo.anofab, veiculo.km, veiculo.classe, id])
    return resposta.affectedRows;
}


/*Remover veiculo */
export async function removerVeiculo(id) {
    const comando =
        `delete from tb_veiculo
	 where       id_veiculo = ? `

    const [resposta] = await con.query(comando, id)
    return resposta.affectedRows
}


// Buscar por ID
export async function BuscarPorID(id) {
    const comando =
        `SELECT id_veiculo              id,
               ds_modelo               nome,
                ds_marca                marca,
                vl_valor                valor,
                ds_placa 	 	        placa,
                dt_anofab               anofab,
                vl_km      	            km,
                ds_classe 		        classe,
                img_veiculo             imagem
    FROM        tb_veiculo
    WHERE       id_veiculo     =         ? ` ;
    const [linhas] = await con.query(comando, id);
    return linhas[0];
}



export async function validateVehicle(novoVeiculo) {

    if (!novoVeiculo.tipo || novoVeiculo.tipo == "Tipo") {
        throw new Error("Tipo do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.modelo) {
        throw new Error("Modelo do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.marca) {
        throw new Error("Marca do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.valor) {
        throw new Error("Valor do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.placa) {
        throw new Error("Placa do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.anoFab) {
        throw new Error("Ano de Fabricação do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.km) {
        throw new Error("Quilometragem do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.codigo) {
        throw new Error("Código do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.classe) {
        throw new Error("Classe do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.img) {
        throw new Error("Imagem do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.cor) {
        throw new Error("Cor do veiculo é obrigatorio!");
    }
    else if (!novoVeiculo.numPortas) {
        throw new Error("Número de portas do veiculo é obrigatorio!");
    }

    if (!novoVeiculo.modelo.trim())
        throw new Error("Modelo do veiculo é obrigatorio!");
    else if (!novoVeiculo.marca.trim())
        throw new Error("Marca do veiculo é obrigatorio!");
    else if (novoVeiculo.valor < 0 || undefined)
        throw new Error("Valor do veiculo é obrigatorio!");
    else if (!novoVeiculo.placa.trim())
        throw new Error("Placa do veiculo é obrigatorio!");
    else if (novoVeiculo.anofab < 0 || undefined)
        throw new Error("Ano de Fabricação do veiculo é obrigatorio!");
    else if (!novoVeiculo.km)
        throw new Error("Quilometragem do veiculo é obrigatorio!");
    else if (!novoVeiculo.codigo)
        throw new Error("Código do veiculo é obrigatorio!");
    else if (!novoVeiculo.classe.trim())
        throw new Error("Classe do veiculo é obrigatorio!");
    else if (!novoVeiculo.img.trim())
        throw new Error("Imagem do veiculo é obrigatorio!");
    else if (!novoVeiculo.cor.trim())
        throw new Error("Cor do veiculo é obrigatorio!");
    else if (!novoVeiculo.numPortas)
        throw new Error("Número de portas do veiculo é obrigatorio!");
    else if (!novoVeiculo.tipo.trim())
        throw new Error("Tipo do veiculo é obrigatorio!");

}