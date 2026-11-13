export class Instrutor {
    constructor(nome, especialidade, email) {
        this.nome = nome;
        this.especialidade = especialidade;
        this.email = email;
    }

    validar() {
        return (
            this.nome.length >= 3 &&
            this.especialidade !== '' &&
            this.email.includes('@') &&
            this.email.includes('.')
        );
    }
}