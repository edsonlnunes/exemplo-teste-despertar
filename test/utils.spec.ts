import { describe, it } from 'node:test'
import { equal } from 'node:assert'
import { Utils } from 'src/utils'

describe('Utils Class', () => {
    it('Deve retornar IDs da turma, prova e aluno sem um impactar o outro', () => {
        equal(Utils.gerarIDAluno(), 1)
        equal(Utils.gerarIDAluno(), 2)
        equal(Utils.gerarIDProva(), 1)
        equal(Utils.gerarIDTurma(), 1)

        equal(Utils.gerarIDAluno(), 3)
        equal(Utils.gerarIDProva(), 2)
        equal(Utils.gerarIDProva(), 3)
        equal(Utils.gerarIDTurma(), 2)

        equal(Utils.gerarIDAluno(), 4)
        equal(Utils.gerarIDProva(), 4)
        equal(Utils.gerarIDTurma(), 3)
        equal(Utils.gerarIDTurma(), 4)
    })
})