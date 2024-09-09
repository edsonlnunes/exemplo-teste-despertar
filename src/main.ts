import { Aluno } from "./aluno";
import { Prova } from "./prova";
import { Turma } from "./turma";

const turma = new Turma();

const aluno1 = new Aluno('Édson Martins')
const aluno2 = new Aluno('Paola Albarnaz')

const primeiraProva = new Prova(
    ['A', 'C', 'B', 'C', 'B', 'C', 'A', 'B', 'B', 'A'],
    ['A', 'B', 'C']
);

const segundaProva = new Prova(
    ['A', 'B', 'B', 'A', 'B', 'A', 'A', 'B', 'B', 'A'],
    ['A', 'B']
);

// turma.matricularAluno(aluno1)
// turma.matricularAluno(aluno2)

// turma.aplicarProva(primeiraProva)
// turma.aplicarProva(segundaProva)

// console.log(turma.listarAlunosComResultado())