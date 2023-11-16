import confirmationsConfig from '@/config/confirmations.config'
import snsConfig from '@/config/sns.config'
import zenviaConfig from '@/config/zenvia.config'
const AWS = require("aws-sdk");
import axios, { AxiosInstance } from 'axios'
import { pick } from 'lodash'


interface NotificationService {
  publish: (Message: string, PhoneNumber: string) => Promise<boolean>
}

class SMS {
  constructor(private notifier: NotificationService) {}

  public async send(message: string, number: string): Promise<boolean> {
    return this.notifier.publish(message, number)
  }
}

class AWSSNSAdapter {
  private $sns: AWS.SNS
  private isEnabled: boolean

  constructor({ _config = snsConfig } = {}) {
    const config = pick(_config, 'apiVersion', 'region')
    
    this.isEnabled = _config.isSmsEnabled
    this.$sns = new AWS.SNS(config)
  }

  public async publish(Message: string, PhoneNumber: string) {
    if (!this.isEnabled) return false

    this.$sns
      .publish({ Message, PhoneNumber }, (error, _) => {
        if (error) {
          console.log('ToPhone: ', PhoneNumber)
          console.log(error)
        }
      })
      .promise()
    return true
  }
}

class ZenviaAdapter {
  private $http: AxiosInstance
  private isEnabled: boolean

  constructor({ config = zenviaConfig } = {}) {
    this.$http = axios.create({
      baseURL: config.baseURL,
      headers: {
        Accept: 'application/json',
        Authorization: config.credentials.key,
        'Content-Type': 'application/json'
      },
      timeout: 30 * 1000
    })
    this.isEnabled = config.isEnabled
  }

  private handleTo(to) {
    return to.replace(/\D+/g, '')
  }

  private mountPayload({ to, msg }) {
    return {
      sendSmsRequest: {
        callbackOption: 'NONE',
        dataCoding: 8,
        from: 'Ecotrace',
        msg: msg,
        to: this.handleTo(to)
      }
    }
  }

  public async publish(msg: string, to: string) {
    if (!this.isEnabled) return true

    try {
      await this.$http.post('/', this.mountPayload({ to, msg }))
      return true
    } catch (ex) {
      return false
    }
  }
}

export class SMSProvider extends SMS {
  constructor({ config = confirmationsConfig } = {}) {
    const sns = new AWSSNSAdapter()
    const zenvia = new ZenviaAdapter()

    async function publish(message: string, phoneNumber: string) {
      const providers = { sns, zenvia }
      const provider = config.provider.SMS.toLowerCase()
      return providers[provider].publish(message, phoneNumber)
    }

    super({ publish })
  }
}
