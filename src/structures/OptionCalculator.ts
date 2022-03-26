import { combinations, erf, sqrt, pow, log, exp, round } from 'mathjs';
import { BigNumber, bignumber } from 'mathjs';
import Option from './Option';

export default class OptionCalculator {
    constructor(
        private option: Option,
    ) {}

    public BlackScholes() {
        const { s0, K, r, sigma, DeltaT: deltaT } = this.option;

        const mu = r - <number>pow(sigma, 2) / 2;
        const xStar = (log(s0 / K) + mu * deltaT) / (sigma * sqrt(deltaT));
        const xTilda = xStar + sigma * sqrt(deltaT);

        const result = s0 * this.Ф(xTilda) - K * exp(-r * deltaT) * this.Ф(xStar);
        return result;
    }
    public CoxRossRubinstein(N: number) {
        const { K, s0, DeltaT: T, sigma, r } = this.option;

        const deltaT = T / N;
        const R = exp(r * deltaT);
        const u = exp(sigma * sqrt(deltaT));
        const d = 1 / u;
        const pStar = (R - d) / (u - d);
        const pTilda = (u * pStar) / R;
        const kStar = round((log(K / s0) - N * log(d)) / (log(u) - log(d)));

        const result = bignumber(s0)
        .mul( this.B(kStar, N, pTilda))
        .sub(
            bignumber(K)
            .div(<BigNumber>pow(bignumber(R), bignumber(N)))
            .mul(this.B(kStar, N, pStar))
        );

        return result.toString();
    }

    private Ф(x: number) {
        return (1 - erf(-x / sqrt(2))) / 2;
    }
    private B(k: number, n: number, p: number) {
        let result = bignumber();

        for (let i = k; i < n; i++) {
            result = result.add(
                <BigNumber>combinations(bignumber(n), bignumber(i))
                .mul(<BigNumber>pow(bignumber(p), bignumber(i)))
                .mul(<BigNumber>pow(bignumber(1).sub(p), bignumber(n).sub(i)))
            )
        }

        return result;
    }

    public set Option(option: Option) {
        this.option = option;
    }
}