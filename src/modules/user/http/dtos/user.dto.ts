export class UserOutput {
  constructor(user: any) {
    this.userId = user.id
    this.nome = user.nome
    this.email = user.email
    this.pwd = user.pwd
    this.numberPhone = user.nr_celular
    this.codeArea = user.celular_cod_pais
  }

  userId: number
  email: string
  pwd: string
  nome: string
  numberPhone: string
  codeArea: string
}
