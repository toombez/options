import { erf, exp, log, pow, sqrt } from "mathjs"
import OptionModel from "@/modules/models/Model"
import { Models } from "../types"

export default class BlackScholesOptionModel extends OptionModel {
    public readonly MODEL_COLOR = '#cf1f57';
    public readonly MODEL_NAME = Models.BlackScholes;
    callPrice(): number {
        const cachedValue = this.cache.call.get('0')
        if (cachedValue) {
            return cachedValue
        }

        const deltaT = this.OptionDeltaT
        const { S, K, r, sigma } = this.Option
        const mu = r + <number>pow(sigma, 2) / 2
        const d1 = (log(S / K) + mu * deltaT) / (sigma * sqrt(deltaT))
        const d2 = d1 - sigma * sqrt(deltaT)

        const result = S * this.Ф(d1) - K * exp(-r * deltaT) * this.Ф(d2)
        this.cache.call.set('0', result)
        return result
    }

    putPrice(): number {
        const cachedValue = this.cache.put.get('0')
        if (cachedValue) {
            return cachedValue
        }

        const deltaT = this.OptionDeltaT
        const { S, K, r, sigma } = this.Option
        const mu = r + <number>pow(sigma, 2) / 2

        const d1 = (log(S / K) + mu * deltaT) / (sigma * sqrt(deltaT))
        const d2 = d1 - sigma * sqrt(deltaT)

        const result = K * exp(-r * deltaT) * this.Ф(-d2) - S * this.Ф(-d1)
        this.cache.put.set('0', result)
        return result
    }

    private Ф(x: number): number {
        return (1 - erf(-x / sqrt(2))) / 2;
    }
}