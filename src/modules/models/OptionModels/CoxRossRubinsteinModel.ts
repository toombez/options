import { BigNumber, bignumber, combinations, exp, log, pow, round, sqrt } from "mathjs";
import OptionModel from "@/modules/models/Model"

export default class CoxRossRubinsteinOptionModel extends OptionModel {
    callPrice(n: number): number {
        const cachedResult = this.cache.call.get(n.toString())
        if (cachedResult) {
            return cachedResult
        }

        const { K, S, sigma, r } = this.Option
        const deltaT = this.OptionDeltaT / n
        const R = exp(r * deltaT)
        const u = exp(sigma * sqrt(deltaT))
        const d = 1 / u
        const p1 = (R - d) / (u - d)
        const p2 = (u * p1) / R
        /** TODO (fix problem with k1):
         *  k1 > 0 not for every n value
         *  Model can set minimal n for it or throw error
         */
        const k1 = round((log(K / S) - n * log(d)) / (log(u) - log(d)))

        const result = bignumber(S)
            .mul(this.B(k1, n, p2))
            .sub(
                bignumber(K)
                .div(<BigNumber>pow(bignumber(R), bignumber(n)))
                .mul(this.B(k1, n, p1))
            ).toNumber()

        this.cache.call.set(n.toString(), result)
        return result
    }

    putPrice(n: number): number {
        const cachedResult = this.cache.put.get(n.toString())
        if (cachedResult) {
            return cachedResult
        }

        const { K, S, r } = this.Option
        const deltaT = this.OptionDeltaT / n
        const R = exp(r * deltaT)

        const result = bignumber(this.callPrice(n))
        .sub(bignumber(S))
        .add(
            bignumber(K)
            .mul(<BigNumber>pow(bignumber(R), -n))
        ).toNumber()
        this.cache.put.set(n.toString(), result)
        return result
    }

    private B(k: number, n: number, p: number): number {
        let result = bignumber();

        for (let i = k; i < n; i++) {
            result = result.add(
                <BigNumber>combinations(bignumber(n), bignumber(i))
                .mul(<BigNumber>pow(bignumber(p), bignumber(i)))
                .mul(<BigNumber>pow(bignumber(1).sub(p), bignumber(n).sub(i)))
            );
        }

        return result.toNumber();
    }
}