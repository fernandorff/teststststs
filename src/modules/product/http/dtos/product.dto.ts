import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { AuxBrandOutput } from 'src/modules/aux-brand/http/dtos/aux-brand.dto'
import { CutOutput } from 'src/modules/aux-cut/http/dtos/aux-cut.dto'
import { AuxLanguageOutput } from 'src/modules/aux-language/http/dtos/aux-language.dto'
import { AuxPageOutput } from 'src/modules/aux-page/http/dtos/aux-page.dto'
import { AuxTypePreparationOutput } from 'src/modules/aux-type-preparation/http/dtos/aux-type-preparation.dto'

export class CreateProductDto {
  @IsNotEmpty({
    message: 'O campo flag_ativo é obrigatório'
  })
  @IsBoolean()
  flag_ativo: boolean

  @IsNotEmpty({
    message: 'O campo linha_produto é obrigatório'
  })
  @IsString()
  linha_produto: string

  @IsNotEmpty({
    message: 'O campo sku é obrigatório'
  })
  @IsString()
  sku: string

  @IsNotEmpty({
    message: 'O campo nome_curto é obrigatório'
  })
  @IsString()
  nome_curto: string

  @IsNotEmpty({
    message: 'O campo tipo_corte_id é obrigatório'
  })
  @IsString()
  tipo_corte_id: string

  @IsString({
    message: 'O campo ean_gtin13 deve ser do tipo string'
  })
  ean_gtin13: string

  @IsString({
    message: 'O campo ean_gtin13 deve ser do tipo string'
  })
  dun_gtin14?: string

  @IsNotEmpty({
    message: 'O campo codigo_idioma é obrigatório'
  })
  codigo_idioma: string

  @IsNotEmpty({
    message: 'O campo categoria_aux é obrigatório'
  })
  categoria_aux: string

  @IsString({
    message: 'O campo descricao deve ser do tipo string'
  })
  descricao?: string

  @IsNotEmpty({
    message: 'O campo tipo_preparo é obrigatório'
  })
  @IsArray()
  tipo_preparo: []

  @IsNotEmpty({
    message: 'O campo tipo_preparo é obrigatório'
  })
  @IsArray()
  pagina: []

  @IsString({
    message: 'O campo descricao deve ser do tipo string'
  })
  media_kg_cx?: string

  @IsString({
    message: 'O campo descricao deve ser do tipo string'
  })
  medidas_cx?: string

  @IsString({
    message: 'O campo descricao deve ser do tipo string'
  })
  validade: string

  @IsString({
    message: 'O campo descricao deve ser do tipo string'
  })
  temperatura: string

  @IsString({
    message: 'O campo descricao deve ser do tipo string'
  })
  img_p_path?: string

  @IsString({
    message: 'O campo descricao deve ser do tipo string'
  })
  img_g_path?: string
}

export class FilterProductDto {
  sku?: string
  ean_gtin13?: string
  dun_gtin14?: string
  flag_ativo?: boolean
  linha_produto?: bigint
  id: bigint
  tipo_corte: bigint
  pagina: bigint
}

export class ProductOutput {
  constructor(product: any) {
    this.id = product.id
    this.nome_curto = product.nome_curto
    this.sku = product.sku
    this.tipo_corte = new CutOutput(product.mod_cms_proteina_aux_tipo_corte)
    this.linha_produto = product.mod_cms_proteina_cx_lista_cortes_marca.map(
      (items) => new AuxBrandOutput(items.mod_cms_marca)
    )
    this.pagina = new AuxPageOutput(product.mod_cms_paginas)
    this.idioma = new AuxLanguageOutput(product.aux_tb_idiomas)
    this.flag_ativo = product.flag_ativo
    this.updated_at = product.updated_at
    this.created_at = product.created_at
  }

  readonly id?: bigint
  readonly nome_curto: string
  readonly sku: string
  readonly tipo_corte: CutOutput
  readonly linha_produto: any
  readonly pagina: any
  readonly idioma: any
  readonly flag_ativo: boolean
  readonly updated_at: Date
  readonly created_at: Date
}

export class OneProductOutput {
  constructor(product: any) {
    this.id = product.id
    this.flag_ativo = product.flag_ativo
    this.linha_produto = product.mod_cms_proteina_cx_lista_cortes_marca.map(
      (items) => new AuxBrandOutput(items.mod_cms_marca)
    )
    this.sku = product.sku
    this.nome_curto = product.nome_curto
    this.tipo_corte = new CutOutput(product.mod_cms_proteina_aux_tipo_corte)
    this.ean_gtin13 = product.ean_gtin13
    this.dun_gtin14 = product.dun_gtin14
    this.codigo_idioma = product.codigo_idioma
    this.categoria_aux = product.categoria_aux
    this.descricao = product.descricao
    this.tipo_preparo = product.mod_cms_proteina_cx_lista_cortes_preparo.map(
      (items) => new AuxTypePreparationOutput(items.mod_cms_proteina_aux_tipo_preparo)
    )
    this.pagina = product.pagina_id
    this.media_kg_cx = product.media_kg_cx
    this.medidas_cx = product.medidas_cx
    this.validade = product.validade
    this.temperatura = product.temperatura
    this.img_p_path = product.img_p_path
    this.img_g_path = product.img_g_path
    this.created_at = product.created_at
    this.updated_at = product.updated_at
  }

  readonly id?: bigint
  readonly flag_ativo: boolean
  readonly linha_produto: any
  readonly sku: string
  readonly nome_curto: string
  readonly tipo_corte: CutOutput
  readonly ean_gtin13: string
  readonly dun_gtin14: string
  readonly codigo_idioma: string
  readonly categoria_aux: string
  readonly descricao: string
  readonly tipo_preparo: any
  readonly pagina: any
  readonly media_kg_cx: string
  readonly medidas_cx: string
  readonly validade: string
  readonly temperatura: string
  readonly img_p_path: string
  readonly img_g_path: string
  readonly created_at: Date
  readonly updated_at: Date
}
