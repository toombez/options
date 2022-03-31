import { erf, exp, log, pow, sqrt } from "mathjs";
import OptionModel from "./OptionModel";

export default class BlackScholesOptionModel extends OptionModel {
    public calculateCallPrice(): number {
        const { s0, K, r, sigma, DeltaT: T } = this.option;
        const mu = r + <number>pow(sigma, 2) / 2;

        const d1 = (log(s0 / K) + mu * T) / (sigma * sqrt(T));
        const d2 = d1 - sigma * sqrt(T);

        const result = s0 * this.Ф(d1) - K * exp(-r * T) * this.Ф(d2);
        return result;
    }
    public calculatePutPrice(): number {
        const { s0, K, r, sigma, DeltaT: T } = this.option;
        const mu = r + <number>pow(sigma, 2) / 2;

        const d1 = (log(s0 / K) + mu * T) / (sigma * sqrt(T));
        const d2 = d1 - sigma * sqrt(T);

        const result = K * exp(-r * T) * this.Ф(-d2) - s0 * this.Ф(-d1);
        return result;
    }

    private Ф(x: number) {
        return (1 - erf(-x / sqrt(2))) / 2;
    }
}