export class AuxPageDto {
  id?: bigint
  cliente_id?: bigint
  template_id?: bigint
  codigo_idioma?: string
  page_titulo?: string
  meta_descricao?: string
  page_content?: string
  meta_keywords?: string
  texto_1?: string
  texto_2?: string
  texto_3?: string
  texto_4?: string
  texto_6?: string
  texto_5?: string
  flag_ativo?: boolean
  owner_id?: bigint
  author_id?: bigint
  created_at?: Date
  updated_at?: Date
}

export class AuxPageOutput {
  constructor(auxPage: any) {
    this.id = auxPage.id
    this.cliente_id = auxPage.cliente_id
    this.template_id = auxPage.template_id
    this.codigo_idioma = auxPage.codigo_idioma
    this.page_titulo = auxPage.page_titulo
    this.meta_descricao = auxPage.meta_descricao
    this.page_content = auxPage.page_content
    this.meta_keywords = auxPage.meta_keywords
    this.texto_1 = auxPage.texto_1
    this.texto_2 = auxPage.texto_2
    this.texto_3 = auxPage.texto_3
    this.texto_4 = auxPage.texto_4
    this.texto_5 = auxPage.texto_5
    this.texto_6 = auxPage.texto_6
    this.flag_ativo = auxPage.flag_ativo
  }
  readonly id?: bigint
  readonly cliente_id?: bigint
  readonly template_id?: bigint
  readonly codigo_idioma?: string
  readonly page_titulo?: string
  readonly meta_descricao?: string
  readonly page_content?: string
  readonly meta_keywords?: string
  readonly texto_1?: string
  readonly texto_2?: string
  readonly texto_3?: string
  readonly texto_4?: string
  readonly texto_6?: string
  readonly texto_5?: string
  readonly flag_ativo?: boolean
}
