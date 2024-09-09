import { Prova } from "./prova";
import { Resultado } from "./resultado";
import { Utils } from "./utils";

export enum EStatus {
    NAO_DEFINIDO = 'NAO_DEFINIDO',
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO'
}

export class Aluno {
    readonly id: number;
    readonly nome: string;
    #resultados: Resultado[];

    get resultados(): Resultado[] {
        return [...this.#resultados];
    }

    constructor(nome: string) {
        this.id = Utils.gerarIDAluno();
        this.#resultados = []
        this.nome = nome;
    }

    verificarProva(provaID: number): boolean {
        return this.#resultados.some(resultado => resultado.provaID === provaID);
    }

    marcarRespostasNaProva(qtdPerguntas: number, respostasPermitidas: string[]): string[] {
        if (qtdPerguntas <= 0) {
            throw new Error('Quantidade de perguntas não pode ser zero ou negativo');
        }

        if (respostasPermitidas.length === 0) {
            throw new Error('Respostas permitidas não pode ser vazio')
        }

        const respostas: string[] = [];
        for (let i = 0; i < qtdPerguntas; i++) {
            const indexResposta = Math.floor(Math.random() * respostasPermitidas.length)
            respostas.push(respostasPermitidas[indexResposta]);
        }
        return respostas;
    }

    aplicarResultadoProva(nota: number, provaID: number): void {
        if (nota < 0) {
            throw new Error('Nota não pode ser menor que zero');
        }
        if (this.#resultados.some(resultado => resultado.provaID === provaID)) {
            throw new Error("Aluno já fez esta prova")
        }
        this.#resultados.push(new Resultado(provaID, nota))
    }

    // verificarResultadoFinal(): EStatus {
    //     if (this.#resultados.length === 0) {
    //         return EStatus.NAO_DEFINIDO;
    //     }
    //     const total = this.#resultados.reduce((total, resultado) => resultado.nota + total, 0)
    //     const media = total / this.#resultados.length;
    //     return media >= 5 ? EStatus.APROVADO : EStatus.REPROVADO;
    // }

    // listarResultados() {
    //     return this.#resultados.map((resultado) => `${resultado.toString()}\n`).join('')
    // }

    // pegarNotaPorProva(provaID: number) {
    //     const resultado = this.#resultados.find(resultado => resultado.provaID === provaID)
    //     if (!resultado) {
    //         throw new Error("Aluno não fez nenhuma prova ainda")
    //     }
    //     return resultado.nota;
    // }

    // toString(): string {
    //     const resultadoProvas = this.#resultados.map(resultado => `${resultado.toString()}`).join(', ')
    //     return `Id: ${this.id} | Nome: ${this.nome} | Status: ${this.verificarResultadoFinal()} | { ${resultadoProvas} }`;
    // }
}