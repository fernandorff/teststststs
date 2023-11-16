export class CodigoAreaOutput {
  constructor(codigo: any) {
    this.codigo = codigo.codigo
    this.nome_pais = codigo.nome_pais
  }

  codigo: string
  nome_pais: string
}
