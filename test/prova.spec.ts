import { describe, it } from 'node:test'
import assert, { equal, throws } from 'node:assert'
import { Prova } from 'src/prova';
import sinon from 'sinon';

describe('Prova Class', () => {
    it('Deve criar duas instancias corretamente', () => {
        const prova1 = new Prova([], []);
        const prova2 = new Prova([], []);

        equal(prova1.id, 1)
        equal(prova2.id, 2)
    })

    it('Deve lançar um erro se o aluno já tiver feito a prova', () => {
        const aluno = {
            verificarProva: sinon.stub().returns(true), // Aluno já fez a prova
            marcarRespostasNaProva: sinon.stub(),
            aplicarResultadoProva: sinon.stub(),
        };

        const prova = new Prova([], []);

        throws(() => prova.aplicarProva(aluno as any), new Error('Aluno já fez a prova'));
    });

    it('Deve chamar aluno.marcarRespostasNaProva com os parâmetros corretos', () => {
        const gabarito = ['A', 'B', 'C', 'B'];
        const respostasPermitidas = ['A', 'B', 'C'];

        const aluno = {
            verificarProva: sinon.stub().returns(false), // Aluno ainda não fez a prova
            marcarRespostasNaProva: sinon.stub().returns([]),
            aplicarResultadoProva: sinon.stub(),
        };

        const prova = new Prova(gabarito, respostasPermitidas);

        prova.aplicarProva(aluno as any);

        assert(aluno.marcarRespostasNaProva.calledOnce);
        assert(aluno.marcarRespostasNaProva.calledWith(gabarito.length, respostasPermitidas));
    });

    it('Deve retornar a nota correta e aplicar o resultado da prova', () => {
        const gabarito = ['A', 'B', 'C', 'B'];
        const respostasPermitidas = ['A', 'B', 'C'];

        const aluno = {
            verificarProva: sinon.stub().returns(false),
            marcarRespostasNaProva: sinon.stub().returns(['A', 'B', 'B', 'A']),
            aplicarResultadoProva: sinon.stub(),
        };

        const prova = new Prova(gabarito, respostasPermitidas);

        const nota = prova.aplicarProva(aluno as any);

        equal(nota, 2);
        assert(aluno.aplicarResultadoProva.calledOnce);
        assert(aluno.aplicarResultadoProva.calledWith(2, prova.id));
    });
})