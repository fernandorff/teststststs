const {
  CONFIRM_COMPANY_NAME: companyName = 'Ecotrace',
  CONFIRM_APP_NAME: appName = 'Trace Beef',
  CONFIRM_SMS_PROVIDER: smsConfirmationProvider = 'SNS',
  CONFIRM_EMAIL_REMEMBER_ENABLED: confirmEmailRememberEnabled,
  WEB_APP_URL: appDomain = process.env.WEB_APP_URL
} = process.env

const config = {
  appName,
  appDomain,
  companyName,
  provider: { SMS: smsConfirmationProvider },
  confirmEmailRememberEnabled: confirmEmailRememberEnabled === 'true'
}

export default Object.freeze(config)
