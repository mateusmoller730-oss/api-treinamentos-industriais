
import conexao from '../database/conexao.js';

export async function cadastrar(sala) {
    const sql = `
        INSERT INTO sala (nome, capacidade, localizacao)
        VALUES (?, ?, ?)
    `;

    const valores = [
        sala.nome,
        sala.capacidade,
        sala.localizacao
    ];

    await conexao.execute(sql, valores);
}

export async function listar() {
    const [resultado] = await conexao.execute(
        'SELECT * FROM sala'
    );

    return resultado;
}

export async function buscarPorId(id) {
    const [resultado] = await conexao.execute(
        'SELECT * FROM sala WHERE id_sala = ?',
        [id]
    );

    return resultado[0];
}

export async function atualizar(id, sala) {
    const sql = `
        UPDATE sala
        SET nome = ?, capacidade = ?, localizacao = ?
        WHERE id_sala = ?
    `;

    const valores = [
        sala.nome,
        sala.capacidade,
        sala.localizacao,
        id
    ];

    await conexao.execute(sql, valores);
}

export async function deletar(id) {
    await conexao.execute(
        'DELETE FROM sala WHERE id_sala = ?',
        [id]
    );
}
