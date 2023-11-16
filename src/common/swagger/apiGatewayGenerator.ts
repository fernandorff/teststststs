import { OpenAPIObject } from '@nestjs/swagger'

type BaseConfiguration = {
  passthroughBehavior: string
  baseUri: string
  type: string
  requestParameters?: Record<string, any>
  connectionType: string
  connectionId: string
}

type ApiGatewayIntegration = {
  connectionId: string
  httpMethod: string
  type: string
  passthroughBehavior: string
  uri: string
  connectionType: string
  requestParameters?: Record<string, string>
}

type CurrentOperation = {
  operationId: string
  parameters: {
    name: string
    required: boolean
    in: string
    description: string
    schema: Record<string, any>
  }[]
  responses: Record<string, any>
  tags: string[]
}

export class ApiGatewayIntegrationGenerator {
  private readonly ExtensionName: string = 'x-amazon-apigateway-integration'
  public constructor(private readonly baseConfiguration: BaseConfiguration) {}

  private generateAmazonOpenApiOperationExtension(path: string, operation: string, currentOperation: CurrentOperation) {
    const { connectionId, type, passthroughBehavior, baseUri, connectionType } = this.baseConfiguration

    const gatewayExtension: ApiGatewayIntegration = {
      connectionId: connectionId,
      httpMethod: operation.toUpperCase(),
      type: type,
      passthroughBehavior: passthroughBehavior,
      uri: `${baseUri}${path}`,
      connectionType: connectionType
    }

    const parsedParameters: Map<string | number, string> = this.createParameterList(path, currentOperation)

    if (parsedParameters.size > 0) {
      const obj = {}
      for (const [key, value] of parsedParameters) {
        obj[key] = value
      }

      gatewayExtension.requestParameters = obj
    }

    return gatewayExtension
  }

  private createParameterList(urlPath: string, currentOperation: CurrentOperation): Map<string | number, string> {
    const ENDPOINTS_LIMIT = 1000
    const generatedList: Map<string | number, string> = new Map<string | number, string>()
    let match: RegExpExecArray | null

    const parameterRegEx = /\/{(\w+)/g

    for (let i = 0; i < ENDPOINTS_LIMIT; i++) {
      match = parameterRegEx.exec(urlPath)
      if (!match) break
      generatedList.set(`integration.request.path.${match[1]}`, `method.request.path.${match[1]}`)
    }

    for (const parameter of currentOperation.parameters) {
      if (parameter.in === 'query') {
        generatedList.set(
          `integration.request.querystring.${parameter.name}`,
          `method.request.querystring.${parameter.name}`
        )
      }

      if (parameter.in === 'path') {
        generatedList.set(`integration.request.path.${parameter.name}`, `method.request.path.${parameter.name}`)
      }

      if (parameter.in === 'header') {
        generatedList.set(`integration.request.header.${parameter.name}`, `method.request.header.${parameter.name}`)
      }

      if (parameter.in === 'body') {
        generatedList.set('integration.request.body', 'method.request.body')
      }

      if (parameter.in === 'formData') {
        generatedList.set(`integration.request.body.${parameter.name}`, `method.request.body.${parameter.name}`)
      }
    }

    return generatedList
  }

  public addToAllPaths(document: OpenAPIObject): OpenAPIObject {
    Object.keys(document.paths).forEach((path: string) => {
      const currentPath = (
        document.paths as {
          [index: string]: Record<string, unknown>
        }
      )[path]
      Object.keys(currentPath).forEach((operation: string) => {
        const currentOperation: CurrentOperation = (
          currentPath as {
            [index: string]: CurrentOperation
          }
        )[operation]

        const gatewayExtension: ApiGatewayIntegration | null = this.generateAmazonOpenApiOperationExtension(
          path,
          operation,
          currentOperation
        )

        Object.assign(currentOperation, {
          [this.ExtensionName]: gatewayExtension
        })
      })
    })

    return document
  }
}
