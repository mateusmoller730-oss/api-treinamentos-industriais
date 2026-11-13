export class Sala {
    constructor(nome, capacidade, localizacao) {
        this.nome = nome;
        this.capacidade = capacidade;
        this.localizacao = localizacao;
    }

    validar() {
        return (
            this.nome &&
            this.nome.trim().length >= 2 &&
            Number.isInteger(this.capacidade) &&
            this.capacidade > 0 &&
            this.localizacao &&
            this.localizacao.trim() !== ''
        );
    }
}