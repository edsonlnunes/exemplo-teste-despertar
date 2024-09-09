import { Aluno, EStatus } from "./aluno";
import { Prova } from "./prova";
import { Utils } from "./utils";

export class Turma {
    readonly id: number;
    readonly #alunos: Aluno[]
    readonly #provasAplicadas: Prova[];

    get alunos(): Aluno[] {
        return [...this.#alunos];
    }

    get historicoDeProvas(): Prova[] {
        return [...this.#provasAplicadas];
    }

    constructor() {
        this.id = Utils.gerarIDTurma()
        this.#alunos = [];
        this.#provasAplicadas = [];
    }

    matricularAluno(aluno: Aluno): void {
        if (this.#alunos.some(a => a.id === aluno.id)) {
            throw new Error('Aluno já matriculado')
        }
        this.#alunos.push(aluno);
    }

    aplicarProva(prova: Prova): void {
        for (const aluno of this.#alunos) {
            prova.aplicarProva(aluno);
        }
        this.#provasAplicadas.push(prova);
    }

    // calcularMediaDaTurma(provaID: number): number {
    //     var total = this.#calcularTotalDasNotas(provaID);
    //     var media = total / this.alunos.length;
    //     return media;
    // }

    // listarAlunosComResultado() {
    //     return `Turma: ${this.id}\n${this.alunos.map(aluno => `${aluno.toString()}\n`).join('')}`;
    // }

    // listaDeAlunosAprovados(): Aluno[] {
    //     var aprovados = this.alunos.filter(
    //         (aluno) => aluno.verificarResultadoFinal() === EStatus.APROVADO
    //     );
    //     return aprovados;
    // }

    // listaDeAlunosReprovados(): Aluno[] {
    //     var aprovados = this.alunos.filter(
    //         (aluno) => aluno.verificarResultadoFinal() === EStatus.REPROVADO
    //     );
    //     return aprovados;
    // }

    // // private methods

    // #calcularTotalDasNotas(provaID: number): number {
    //     const total = this.alunos
    //         .map((aluno) => aluno.pegarNotaPorProva(provaID))
    //         .reduce((total, nota) => total + nota);
    //     return total;
    // }
}