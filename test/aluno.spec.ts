import { describe, it } from 'node:test'
import { deepEqual, equal, ok, throws } from 'node:assert'
import { Aluno } from 'src/aluno';
import { Resultado } from 'src/resultado';

describe('Aluno Class', () => {

    // unit test
    it('Deve criar duas instancias corretamente', () => {
        const aluno1 = new Aluno('Édson');
        const aluno2 = new Aluno('Paola');

        equal(aluno1.id, 1)
        equal(aluno1.nome, 'Édson')
        deepEqual(aluno1.resultados, [])
        aluno1.resultados.push(new Resultado(1, 1))
        deepEqual(aluno1.resultados, [])

        equal(aluno2.id, 2)
        equal(aluno2.nome, 'Paola')
    })

    // unit test
    it('Deve retornar falso quando aluno não fez a prova', () => {
        const aluno = new Aluno('Édson');
        equal(aluno.verificarProva(1), false)
    })

    // unit test
    it('Deve retornar true quando aluno já fez a prova', () => {
        const aluno = new Aluno('Édson');
        aluno.aplicarResultadoProva(1, 1)
        equal(aluno.verificarProva(1), true)
    })

    // unit test
    it('Deve lançar um erro se a quantidade de perguntas for zero ou negativo', () => {
        const aluno = new Aluno('Édson');

        throws(() =>
            aluno.marcarRespostasNaProva(0, []),
            Error('Quantidade de perguntas não pode ser zero ou negativo')
        );

        throws(() =>
            aluno.marcarRespostasNaProva(-3, []),
            Error('Quantidade de perguntas não pode ser zero ou negativo')
        );
    });

    // unit test
    it('Deve lançar um erro se o array de respostas permitidas estiver vazia', () => {
        const aluno = new Aluno('Édson');

        throws(() =>
            aluno.marcarRespostasNaProva(5, []),
            Error('Respostas permitidas não pode ser vazio')
        );
    });

    // unit test
    it('Deve retornar a quantidade correta de respostas', () => {
        const aluno = new Aluno('Édson');
        const qtdPerguntas = 5;
        const respostasPermitidas = ['A', 'B', 'C', 'D'];

        const respostas = aluno.marcarRespostasNaProva(qtdPerguntas, respostasPermitidas);

        equal(respostas.length, qtdPerguntas);
    });

    // unit test
    it('Todas as respostas devem ser permitidas', () => {
        const aluno = new Aluno('Édson');
        const qtdPerguntas = 10;
        const respostasPermitidas = ['A', 'B', 'C', 'D'];

        const respostas = aluno.marcarRespostasNaProva(qtdPerguntas, respostasPermitidas);

        respostas.forEach((resposta) => {
            ok(respostasPermitidas.includes(resposta));
        });
    });

    // unit test
    it('Deve lançar um erro se a nota for menor que zero', () => {
        const aluno = new Aluno('Édson');

        throws(() =>
            aluno.aplicarResultadoProva(-3, 1),
            Error('Nota não pode ser menor que zero')
        );
    });

    it('Deve salvar o resultado da prova se aluno não fez ela ainda', () => {
        const aluno = new Aluno('Édson');
        aluno.aplicarResultadoProva(5, 1);
        deepEqual(aluno.resultados, [new Resultado(1, 5)])
    });

    // unit test
    it('Deve lançar um erro se o aluno já fez a prova', () => {
        const aluno = new Aluno('Édson');
        aluno.aplicarResultadoProva(5, 1);
        throws(() =>
            aluno.aplicarResultadoProva(5, 1),
            Error('Aluno já fez esta prova')
        );
    });
})