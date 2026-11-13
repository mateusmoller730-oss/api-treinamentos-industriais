
import conexao from '../database/conexao.js';

export async function cadastrar(instrutor) {
    const sql = `
        INSERT INTO instrutor (nome, especialidade, email)
        VALUES (?, ?, ?)
    `;

    const valores = [
        instrutor.nome,
        instrutor.especialidade,
        instrutor.email
    ];

    await conexao.execute(sql, valores);
}

export async function listar() {
    const [resultado] = await conexao.execute(
        'SELECT * FROM instrutor'
    );

    return resultado;
}

export async function buscarPorId(id) {
    const [resultado] = await conexao.execute(
        'SELECT * FROM instrutor WHERE id_instrutor = ?',
        [id]
    );

    return resultado[0];
}

export async function atualizar(id, instrutor) {
    const sql = `
        UPDATE instrutor
        SET nome = ?, especialidade = ?, email = ?
        WHERE id_instrutor = ?
    `;

    const valores = [
        instrutor.nome,
        instrutor.especialidade,
        instrutor.email,
        id
    ];

    await conexao.execute(sql, valores);
}

export async function deletar(id) {
    await conexao.execute(
        'DELETE FROM instrutor WHERE id_instrutor = ?',
        [id]
    );
}

export async function buscarPorNome(nome) {
    const [resultado] = await conexao.execute(
        'SELECT * FROM instrutor WHERE nome LIKE ?',
        [`%${nome}%`]
    );

    return resultado;
}
