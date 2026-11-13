
import express from 'express';

import {
    cadastrarInstrutor,
    listarInstrutores,
    buscarInstrutorPorId,
    atualizarInstrutor,
    deletarInstrutor,
    buscarInstrutorPorNome
} from '../controller/instrutorController.js';

const router = express.Router();

router.post('/', cadastrarInstrutor);
router.get('/', listarInstrutores);
router.get('/nome/:nome', buscarInstrutorPorNome);
router.get('/:id', buscarInstrutorPorId);
router.patch('/:id', atualizarInstrutor);
router.delete('/:id', deletarInstrutor);

export default router;
