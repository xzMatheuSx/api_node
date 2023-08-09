const express = require('express');
const cors = require('cors');

const listenPort = 3000;
const app = express();
app.use(cors({
    origin: '*'
}), express.json());

app.listen(listenPort, () => {
    console.log('listening on http://localhost:' + listenPort);
});

app.get('/', (request, response) => {
    response.send('Mensagem enviada!');
});


app.post('/calcular-consumo', (req, res) => {
    const { distanciaPercorrida, quantidadeCombustivel } = req.body;

    if (!distanciaPercorrida || !quantidadeCombustivel) {
       return res.status(400).json({ error: 'Distância percorrida e quantidade de combustível são obrigatórios.' });
    }

    const consumoKmPorLitro = distanciaPercorrida / quantidadeCombustivel;
    res.json({ consumoKmPorLitro });
});


app.post('/calculadora', (req, res) => {
    const { num1, num2, operator } = req.body;

    let resultado;
    switch (operator) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 !== 0) {
                resultado = num1 / num2;
            } else {
                return res.status(400).json({ error: 'A divisão por zero não é permitida'});
            }
            break;
        default:
            return res.status(400).json({ error: 'Operador inválido' });
    }

    return res.json({ resultado });
});

app.post('/media', (req, response) => {
    let { nota1, nota2, nota3, nota4 } = req.body;

    let media = (Number(nota1) + Number(nota2) + Number(nota3)
    + Number(nota4)) / 4; 

    return response.json(media)
})

app.post('/par-ou-impar', (req, response) => {
    const { numero } = req.body;

    if (!numero) {
        return response.status(400).json({ error: 'Número é obrigatório.' });
    }

    if (numero % 2 === 0) {
        response.json('par');
    } else {
        response.json('ímpar');
    }
});

app.post('/idade', (req, response) => {
    const { anoNascimento } = req.body;

    if (!anoNascimento) {
        return response.status(400).json({ error: 'Ano de nascimento é obrigatório.' });
    }

    const idade = new Date().getFullYear() - anoNascimento;
    response.json(idade);
});


