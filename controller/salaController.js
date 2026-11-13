
import { Sala } from '../model/Sala.js';

import {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    deletar
} from '../repository/salaRepository.js';

import { validarId } from '../model/validarId.js';

export async function cadastrarSala(req, res) {
    try {
        const { nome, capacidade, localizacao } = req.body;

        const sala = new Sala(nome, capacidade, localizacao);

        if (!sala.validar()) {
            return res.status(400).json({ mensagem: 'Dados inválidos' });
        }

        await cadastrar(sala);

        res.status(201).json({ mensagem: 'Sala cadastrada' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function listarSalas(req, res) {
    try {
        const salas = await listar();
        res.status(200).json(salas);

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function buscarSalaPorId(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const sala = await buscarPorId(id);

        if (!sala) {
            return res.status(404).json({ mensagem: 'Sala não encontrada' });
        }

        res.status(200).json(sala);

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function atualizarSala(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const atual = await buscarPorId(id);

        if (!atual) {
            return res.status(404).json({ mensagem: 'Sala não encontrada' });
        }

        const dados = {
            nome: req.body.nome ?? atual.nome,
            capacidade: req.body.capacidade ?? atual.capacidade,
            localizacao: req.body.localizacao ?? atual.localizacao
        };

        const sala = new Sala(
            dados.nome,
            dados.capacidade,
            dados.localizacao
        );

        if (!sala.validar()) {
            return res.status(400).json({ mensagem: 'Dados inválidos' });
        }

        await atualizar(id, dados);

        res.status(200).json({ mensagem: 'Sala atualizada' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function deletarSala(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const sala = await buscarPorId(id);

        if (!sala) {
            return res.status(404).json({ mensagem: 'Sala não encontrada' });
        }

        await deletar(id);

        res.status(200).json({ mensagem: 'Sala deletada' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}
