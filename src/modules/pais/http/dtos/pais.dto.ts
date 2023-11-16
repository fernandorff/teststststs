export class PaisOutput {
  constructor(pais: any) {
    this.nome = pais.nome
    this.capital = pais.capital
    this.continente = pais.continente
  }

  nome: string
  capital: string
  continente: string
}
