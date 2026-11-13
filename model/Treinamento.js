export class Treinamento {
    constructor(nome, carga_horaria, modalidade) {
        this.nome = nome;
        this.carga_horaria = carga_horaria;
        this.modalidade = modalidade;
    }

    validar() {
        return (
            this.nome &&
            this.nome.trim().length >= 3 &&
            Number.isInteger(this.carga_horaria) &&
            this.carga_horaria > 0 &&
            this.modalidade &&
            this.modalidade.trim() !== ''
        );
    }
}