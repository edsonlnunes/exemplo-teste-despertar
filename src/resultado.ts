export class Resultado {
    readonly provaID: number;
    readonly nota: number;

    constructor(prova: number, nota: number) {
        this.provaID = prova;
        this.nota = nota;
    }

    toString(): string {
        return `[ Prova: ${this.provaID} | Nota: ${this.nota} ]`
    }
}