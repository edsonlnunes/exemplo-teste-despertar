import { Aluno } from "./aluno";
import { Utils } from "./utils";

export class Prova {
    readonly id: number;
    readonly #gabarito: string[];
    readonly #respostasPermitidas: string[];

    constructor(gabarito: string[], respostasPermitidas: string[]) {
        this.id = Utils.gerarIDProva();
        this.#gabarito = gabarito;
        this.#respostasPermitidas = respostasPermitidas;
    }

    aplicarProva(aluno: Aluno): number {
        if (aluno.verificarProva(this.id)) {
            throw new Error('Aluno já fez a prova');
        }

        var respostas = aluno.marcarRespostasNaProva(
            this.#gabarito.length,
            this.#respostasPermitidas,
        );

        var nota = this.#corrigirProva(respostas);
        aluno.aplicarResultadoProva(nota, this.id)
        return nota;
    }

    // // private methods

    #corrigirProva(respostas: string[]): number {
        let nota = 0;
        for (var i = 0; i < this.#gabarito.length; i++) {
            if (respostas[i] == this.#gabarito[i]) {
                nota += 1;
            }
        }
        return nota;
    }
}