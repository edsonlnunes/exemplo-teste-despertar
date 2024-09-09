import { describe, it } from 'node:test'
import assert, { deepEqual, equal, throws } from 'node:assert'
import { Turma } from 'src/turma';
import { Aluno } from 'src/aluno';
import { Prova } from 'src/prova';
import sinon from 'sinon';

describe('Turma Class', () => {

    // unit test
    it('Deve criar duas instancia corretamente', () => {
        const turma1 = new Turma();
        const turma2 = new Turma();

        equal(turma1.id, 1)
        deepEqual(turma1.alunos, [])
        deepEqual(turma1.historicoDeProvas, [])
        turma1.alunos.push(new Aluno(''))
        turma1.historicoDeProvas.push(new Prova([], []))
        deepEqual(turma1.alunos, [])
        deepEqual(turma1.historicoDeProvas, [])

        equal(turma2.id, 2)
        deepEqual(turma2.alunos, [])
    })

    // unit test
    it('Deve matricular um aluno com sucesso', () => {
        const turma = new Turma();
        const aluno = new Aluno('')
        turma.matricularAluno(aluno);
        deepEqual(turma.alunos, [aluno])
    })

    // unit test
    it('Deve retornar um erro ao matricular o mesmo aluno', () => {
        const turma = new Turma();
        const aluno = new Aluno('')
        turma.matricularAluno(aluno);
        deepEqual(turma.alunos, [aluno])

        throws(() => turma.matricularAluno(aluno), Error('Aluno já matriculado'))
        deepEqual(turma.alunos, [aluno])
    })

    it('Deve aplicar a prova com sucesso em uma turma', () => {
        const turma = new Turma();
        const aluno1 = new Aluno('');
        const aluno2 = new Aluno('');

        const prova = {
            aplicarProva: sinon.stub()
        }

        turma.matricularAluno(aluno1)
        turma.matricularAluno(aluno2)
        turma.aplicarProva(prova as any);

        deepEqual(turma.historicoDeProvas, [prova])
        assert(prova.aplicarProva.calledTwice);
        assert(prova.aplicarProva.calledWith(aluno1));
        assert(prova.aplicarProva.calledWith(aluno2));
    })

    it('Deve lançar um erro se der erro ao aplicar prova ', () => {
        const turma = new Turma();
        const aluno1 = new Aluno('');
        const aluno2 = new Aluno('');

        const prova = {
            aplicarProva: sinon.stub().throws(new Error('error'))
        }

        turma.matricularAluno(aluno1)
        turma.matricularAluno(aluno2)

        throws(() => turma.aplicarProva(prova as any), Error('error'))
        deepEqual(turma.historicoDeProvas, [])
    })
})