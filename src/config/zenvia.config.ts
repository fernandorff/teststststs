const {
  IS_SMS_ENABLED: isEnabled = false,
  ZENVIA_BASE_URL: baseURL,
  ZENVIA_API_KEY: APIKey
} = process.env

const config = {
  baseURL: String(baseURL),
  credentials: { key: String(APIKey) },
  isEnabled: Boolean(isEnabled)
}

if (typeof isEnabled === 'string') {
  Object.assign(config, {
    isEnabled: isEnabled === 'true'
  })
}

export default Object.freeze(config)
