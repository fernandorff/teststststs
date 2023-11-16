import { v4 as uuid } from 'uuid'

export class Randomizer {
  public static getRandomCode({
    length = 6,
    availableChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  } = {}): string {
    const code: string[] = []

    for (let i = length; i > 0; i -= 1) {
      const index = Math.floor(Math.random() * availableChars.length)
      code.push(availableChars[index])
    }

    return code.join('')
  }

  public static uuid(): string {
    const raw = uuid()
    return raw.toString()
  }

  public static getRandomNumber(min = 0, max = 9): number {
    return Math.trunc(Math.random() * (max - min) + min)
  }

  public static getNumericRandom({ length = 6 } = {}): string {
    const max = Number(
      Array.from({ length })
        .fill(9)
        .join('')
    )

    const pattern = this.getRandomNumber().toString()
    const base = this.getRandomNumber(0, max)

    return base.toString().padStart(length, pattern)
  }
}
