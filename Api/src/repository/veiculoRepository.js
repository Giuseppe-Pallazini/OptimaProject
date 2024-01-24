import { con } from "./connection.js";

/*inserir veiculo*/
export async function inserirVeiculo(veiculo) {
    const comando =
        `INSERT INTO tb_veiculo (ds_modelo, ds_marca, vl_valor, ds_placa, dt_anofab, vl_km, ds_classe)
                                     VALUES (?, ?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(comando, [veiculo.modelo, veiculo.marca, veiculo.valor, veiculo.placa, veiculo.anofab, veiculo.km,veiculo.classe]);
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
                ds_modelo               nome,
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
export async function buscarPorNome(nome) {
    const comando =
        `select 	id_veiculo      id,
		            ds_modelo                nome,
		            ds_marca                 marca,
		            vl_valor                 valor,
                    ds_placa 	 	        placa,
                    dt_anofab               anofab,
                    vl_km                   km,	
                    ds_classe               classe,
                    img_veiculo             imagem
       from tb_veiculo
	            where ds_modelo    like ?
                  or ds_marca like ? `

    const [linhas] = await con.query(comando, [`%${nome}%`, `%${nome}%`]);
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

    const [resposta] = await con.query(comando, [veiculo.modelo, veiculo.marca, veiculo.valor, veiculo.placa, veiculo.anofab, veiculo.km, veiculo.classe, veiculo.id])
    return resposta.affectedRows;
}


/*Remover veiculo */
export async function removerVeiculo(id) {
    const comando =
        `delete from tb_veiculo
	 where       id_veiculo = ? `

    const [resposta] = await con.query(comando, [id])
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
    const [linhas] = await con.query(comando, [id]);
   return linhas[0];
}


