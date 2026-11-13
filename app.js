
import express from 'express';

import treinamentoRoutes from './routes/treinamentoRoutes.js';
import instrutorRoutes from './routes/instrutorRoutes.js';
import salaRoutes from './routes/salaRoutes.js';

const app = express();

app.use(express.json());

app.use('/treinamento', treinamentoRoutes);
app.use('/instrutor', instrutorRoutes);
app.use('/sala', salaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
