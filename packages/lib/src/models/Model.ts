import { IModel, IOption } from '@types';

export default abstract class Model implements IModel {
    public constructor(
        public readonly option: IOption,
        public readonly DAYS_IN_YEAR: number = 360,
    ) {}

    public get percentageTimeDelta(): number {
        const { date, expirationDate } = this.option

        const timeDifference = Math.abs(date.getTime() - expirationDate.getTime())
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

        return daysDifference / this.DAYS_IN_YEAR
    }

    abstract get putPrice(): number

    abstract get callPrice(): number

    protected static normalCDF(mean: number, sigma: number, x: number) {
        const z = (x - mean) / Math.sqrt(2 * sigma * sigma)
        const t = 1 / (1 + 0.3275911 * Math.abs(z))

        const a1 =  0.254829592
        const a2 = -0.284496736
        const a3 =  1.421413741
        const a4 = -1.453152027
        const a5 =  1.061405429

        const erf = 1-(((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)
        const sign = z < 0 ? -1 : 1

        return (1 / 2) * (1 + sign * erf)
    }

    protected static standartNormalCDF(x: number) {
        return this.normalCDF(0, 1, x)
    }
}
