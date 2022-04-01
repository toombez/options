import { OptionGraphData } from "@/assets/types";
import { BigNumber, bignumber, combinations, exp, log, pow, round, sqrt } from "mathjs";
import OptionModel from "./OptionModel";

export default class CoxRossRubinsteinOptionModel extends OptionModel {
    public generateGraphData(N: number): OptionGraphData {
        const data: OptionGraphData = {
            call: [],
            put: [],
        };

        for (let i = 0; i < N; i++) {
            data.call.push(this.calculateCallPrice(N));
            data.put.push(this.calculatePutPrice(N));
        }

        return data;
    }

    public calculateCallPrice(N: number): BigNumber {
        const cachedResult = this.cache.get(N);
        if (cachedResult) return cachedResult;

        const { K, s0, DeltaT: T, sigma, r } = this.option;
        const deltaT = T / N;
        const R = exp(r * deltaT);
        const u = exp(sigma * sqrt(deltaT));
        const d = 1 / u;

        const p1 = (R - d) / (u - d);
        const p2 = (u * p1) / R;
        /** TODO (fix problem with k1):
         *  k1 > 0 not for every n value
         *  Model can set minimal n for it or throw error
         */
        const k1 = round((log(K / s0) - N * log(d)) / (log(u) - log(d)));

        const result = bignumber(s0)
            .mul(this.B(k1, N, p2))
            .sub(
                bignumber(K)
                .div(<BigNumber>pow(bignumber(R), bignumber(N)))
                .mul(this.B(k1, N, p1))
            );

        if (!cachedResult) this.cache.set(N, result);

        return result;
    }
    public calculatePutPrice(N: number): BigNumber {
        const { K, s0, DeltaT: T, r } = this.option;
        const deltaT = T / N;
        const R = exp(r * deltaT);

        const result = this.calculateCallPrice(N)
        .sub(bignumber(s0))
        .add(
            bignumber(K)
            .mul(<BigNumber>pow(bignumber(R), -N))
        );
        return result;
    }

    /** IDEA (cache optimize)
     *  Cache might containt string instead BigNumbers
     */
    private cache: Map<number, BigNumber> = new Map();

    private B(k: number, n: number, p: number) {
        let result = bignumber();

        for (let i = k; i < n; i++) {
            result = result.add(
                <BigNumber>combinations(bignumber(n), bignumber(i))
                .mul(<BigNumber>pow(bignumber(p), bignumber(i)))
                .mul(<BigNumber>pow(bignumber(1).sub(p), bignumber(n).sub(i)))
            );
        }

        return result;
    }
}