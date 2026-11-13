
import { Treinamento } from '../model/Treinamento.js';

import {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    deletar
} from '../repository/treinamentoRepository.js';

import { validarId } from '../model/validarId.js';

export async function cadastrarTreinamento(req, res) {
    try {
        const { nome, carga_horaria, modalidade } = req.body;

        const treinamento = new Treinamento(nome, carga_horaria, modalidade);

        if (!treinamento.validar()) {
            return res.status(400).json({ mensagem: 'Dados inválidos' });
        }

        await cadastrar(treinamento);

        res.status(201).json({ mensagem: 'Treinamento cadastrado' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function listarTreinamentos(req, res) {
    try {
        const treinamentos = await listar();
        res.status(200).json(treinamentos);

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function buscarTreinamentoPorId(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const treinamento = await buscarPorId(id);

        if (!treinamento) {
            return res.status(404).json({ mensagem: 'Treinamento não encontrado' });
        }

        res.status(200).json(treinamento);

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function atualizarTreinamento(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const atual = await buscarPorId(id);

        if (!atual) {
            return res.status(404).json({ mensagem: 'Treinamento não encontrado' });
        }

        const dados = {
            nome: req.body.nome ?? atual.nome,
            carga_horaria: req.body.carga_horaria ?? atual.carga_horaria,
            modalidade: req.body.modalidade ?? atual.modalidade
        };

        const treinamento = new Treinamento(
            dados.nome,
            dados.carga_horaria,
            dados.modalidade
        );

        if (!treinamento.validar()) {
            return res.status(400).json({ mensagem: 'Dados inválidos' });
        }

        await atualizar(id, dados);

        res.status(200).json({ mensagem: 'Treinamento atualizado' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

export async function deletarTreinamento(req, res) {
    try {
        const id = req.params.id;

        if (!validarId(id)) {
            return res.status(400).json({ mensagem: 'ID inválido' });
        }

        const treinamento = await buscarPorId(id);

        if (!treinamento) {
            return res.status(404).json({ mensagem: 'Treinamento não encontrado' });
        }

        await deletar(id);

        res.status(200).json({ mensagem: 'Treinamento deletado' });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
}
