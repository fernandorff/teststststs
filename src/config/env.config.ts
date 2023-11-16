import * as AWS from 'aws-sdk'

const client = new AWS.SSM({ region: 'us-east-1' })
const envirom = ['local', 'development', 'staging', 'production']

export const config = async (): Promise<any> => {
  const NODE_ENV = process.env.NODE_ENV
  const params: any = {}
  if (!envirom.includes(NODE_ENV)) {
    throw new Error(`Invalid NODE_ENV: ${NODE_ENV}`)
  }
  console.info('Environment: ', NODE_ENV)

  if (NODE_ENV !== 'local') {
    console.log('Loading parameters from SSM')
    const APPLICATION_NAME = process.env.APPLICATION_NAME
    try {
      const parameter = await client
        .getParameter({
          Name: `${APPLICATION_NAME}-${NODE_ENV}.json`,
          WithDecryption: true
        })
        .promise()
      const parsedValue = JSON.parse(parameter.Parameter?.Value ?? '')
      if (!parsedValue) {
        throw new Error('Invalid parameters response')
      }
      Object.keys(parsedValue).forEach((paramName) => {
        if (paramName) process.env[paramName] = parsedValue[paramName] ?? ''
        if (paramName) params[paramName] = parsedValue[paramName] ?? ''
      })
      console.log('Parameters loaded from SSM')
    } catch (error) {
      console.error('Error loading parameters from SSM', error)
      throw error
    }
  }

  return {
    port: params.PORT || process.env.PORT,
    version: params.VERSION || process.env.VERSION,
    environment: NODE_ENV || process.env.NODE_ENV,
    persistenceHost: params.SERVICE_DB_PERSISTENCE_HOST || process.env.SERVICE_DB_PERSISTENCE_HOST,
    swaggerJsonFileName: process.env.SWAGGER_JSON_FILE_NAME,
    jwtSecret: process.env.JWT_SECRET_KEY
  }
}
