export class Utils {
    static #contadorIDTurma = 0;
    static #contadorIDAluno = 0;
    static #contadorIDProva = 0;

    static gerarIDTurma(): number {
        this.#contadorIDTurma++;
        return this.#contadorIDTurma;
    }

    static gerarIDAluno(): number {
        this.#contadorIDAluno++;
        return this.#contadorIDAluno;
    }

    static gerarIDProva(): number {
        this.#contadorIDProva++;
        return this.#contadorIDProva;
    }
}