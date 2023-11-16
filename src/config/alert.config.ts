const {
  ALERT_EMAIL_ANALYSIS_ENABLED: alertEmailAnalysisEnabled = false,
  ALERT_EMAIL_TRANSFER_USER_ENABLED: alertEmailTransferUserEnabled = false,
  ALERT_EMAIL_TRANSFER_CRM_ENABLED: alertEmailTransferCrmEnabled = false,
  ALERT_EMAIL_TRANSFER_CRM_EMAIL:
    alertEmailTransferCrmEmail = 'ti@ecotrace.info',
  ALERT_EMAIL_RECOVER_PROFILE_CRM_EMAIL:
    alertEmailRecoverProfileEmail = 'ti@ecotrace.info'
} = process.env

const config = {
  alertEmailAnalysisEnabled: alertEmailAnalysisEnabled === 'true',
  alertEmailTransferUserEnabled: alertEmailTransferUserEnabled === 'true',
  alertEmailTransferCrmEnabled: alertEmailTransferCrmEnabled === 'true',
  alertEmailTransferCrmEmail,
  alertEmailRecoverProfileEmail
}

export default Object.freeze(config)
