
import conexao from '../database/conexao.js';

export async function cadastrar(treinamento) {
    const sql = `
        INSERT INTO treinamento (nome, carga_horaria, modalidade)
        VALUES (?, ?, ?)
    `;

    const valores = [
        treinamento.nome,
        treinamento.carga_horaria,
        treinamento.modalidade
    ];

    await conexao.execute(sql, valores);
}

export async function listar() {
    const [resultado] = await conexao.execute(
        'SELECT * FROM treinamento'
    );

    return resultado;
}

export async function buscarPorId(id) {
    const [resultado] = await conexao.execute(
        'SELECT * FROM treinamento WHERE id_treinamento = ?',
        [id]
    );

    return resultado[0];
}

export async function atualizar(id, treinamento) {
    const sql = `
        UPDATE treinamento
        SET nome = ?, carga_horaria = ?, modalidade = ?
        WHERE id_treinamento = ?
    `;

    const valores = [
        treinamento.nome,
        treinamento.carga_horaria,
        treinamento.modalidade,
        id
    ];

    await conexao.execute(sql, valores);
}

export async function deletar(id) {
    await conexao.execute(
        'DELETE FROM treinamento WHERE id_treinamento = ?',
        [id]
    );
}
