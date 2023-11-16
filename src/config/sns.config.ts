const {
    SNS_REGION: snsRegion,
    SNS_ACCESS_KEY: accessKey,
    SNS_SECRET_KEY: secretAccessKey,
    SNS_API_VERSION: apiVersion = '2010-03-31',
    IS_SMS_ENABLED: isSmsEnabled = 'true'
} = process.env

export default {
    region: snsRegion ? String(snsRegion) : undefined,
    accessKeyId: accessKey ? String(accessKey) : undefined,
    secretAccessKey: secretAccessKey ? String(secretAccessKey) : undefined,
    isSmsEnabled: isSmsEnabled === 'true',
    apiVersion
}
  