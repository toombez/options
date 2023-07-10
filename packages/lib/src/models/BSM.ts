import Model from './Model';

/**
 * Black-Scholes model
 */
export default class BSM extends Model {
    public get callPrice(): number {
        const { underlyingPrice, strikePrice, riskFreeRate } = this.option
        const { dividendYield } = this.option.underlyingAsset
        const { percentageTimeDelta, d1, d2 } = this

        const leftExp = Math.exp(-dividendYield * percentageTimeDelta)
        const rightExp = Math.exp(-riskFreeRate * percentageTimeDelta)
        const leftPart = Model.standartNormalCDF(d1) * underlyingPrice * leftExp
        const rightPart = Model.standartNormalCDF(d2) * strikePrice * rightExp

        return leftPart - rightPart
    }

    public get putPrice(): number {
        const { underlyingPrice, strikePrice, riskFreeRate } = this.option
        const { dividendYield } = this.option.underlyingAsset
        const { percentageTimeDelta, d1, d2 } = this

        const leftExp = Math.exp(-riskFreeRate * percentageTimeDelta)
        const rightExp = Math.exp(-dividendYield * percentageTimeDelta)

        const leftPart = Model.standartNormalCDF(-d2) * strikePrice * leftExp
        const rightPart = Model.standartNormalCDF(-d1) * underlyingPrice * rightExp

        return leftPart - rightPart
    }

    private get d1() {
        const { underlyingPrice, strikePrice, riskFreeRate } = this.option
        const { volatility, dividendYield } = this.option.underlyingAsset
        const { percentageTimeDelta } = this

        const numeratorLeftPart = Math.log(underlyingPrice / strikePrice)
        const numeratorRightPart = riskFreeRate - dividendYield + (volatility ** 2) / 2

        const numerator = numeratorLeftPart + numeratorRightPart * percentageTimeDelta
        const denomerator = volatility * Math.sqrt(percentageTimeDelta)

        return numerator / denomerator
    }

    private get d2() {
        const { d1, percentageTimeDelta } = this
        const { volatility } = this.option.underlyingAsset

        return d1 - volatility * Math.sqrt(percentageTimeDelta)
    }
}
