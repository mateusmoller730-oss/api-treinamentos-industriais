
import { Instrutor } from '../model/Instrutor.js';

import {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    deletar,
    buscarPorNome
} from '../repository/instrutorRepository.js';

import { validarId } from '../model/validarId.js';

export async function cadastrarInstrutor(req, res) {
    try {
        const { nome, especialidade, email } = req.body;

        const instrutor = new Instrutor(nome, especialidade, email);

        if (!instrutor.validar()) {
            return res.status(400).json({ mensagem: 'Dados inválidos' });
        }

        await cadastrar(instrutor);

        res.status(201).json({ mensagem: 'Instrutor cadastrado' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function listarInstrutores(req, res) {
    try {
        const instrutores = await listar();
        res.status(200).json(instrutores);

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function buscarInstrutorPorId(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const instrutor = await buscarPorId(id);

        if (!instrutor) {
            return res.status(404).json({ mensagem: 'Instrutor não encontrado' });
        }

        res.status(200).json(instrutor);

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function atualizarInstrutor(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const atual = await buscarPorId(id);

        if (!atual) {
            return res.status(404).json({ mensagem: 'Instrutor não encontrado' });
        }

        const dados = {
            nome: req.body.nome ?? atual.nome,
            especialidade: req.body.especialidade ?? atual.especialidade,
            email: req.body.email ?? atual.email
        };

        const instrutor = new Instrutor(
            dados.nome,
            dados.especialidade,
            dados.email
        );

        if (!instrutor.validar()) {
            return res.status(400).json({ mensagem: 'Dados inválidos' });
        }

        await atualizar(id, dados);

        res.status(200).json({ mensagem: 'Instrutor atualizado' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function deletarInstrutor(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const instrutor = await buscarPorId(id);

        if (!instrutor) {
            return res.status(404).json({ mensagem: 'Instrutor não encontrado' });
        }

        await deletar(id);

        res.status(200).json({ mensagem: 'Instrutor deletado' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function buscarInstrutorPorNome(req, res) {
    try {
        const nome = req.params.nome;

        const instrutores = await buscarPorNome(nome);

        res.status(200).json(instrutores);

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}
