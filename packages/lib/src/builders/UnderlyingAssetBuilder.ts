import UnderlyingAsset from '@structures/UnderlyingAsset'
import { IUnderlyingAsset, IUnderlyingAssetBuilder } from '@types'

export default class UnderlyingAssetBuilder implements IUnderlyingAssetBuilder {
    protected name?: IUnderlyingAsset['name']
    protected volatility?: IUnderlyingAsset['volatility']
    protected price?: IUnderlyingAsset['price']
    protected dividendYield?: IUnderlyingAsset['dividendYield']

    public setName(name: IUnderlyingAsset['name']) {
        this.name = name

        return this
    }

    public setVolatility(volatility: IUnderlyingAsset['volatility']) {
        this.volatility = volatility

        return this
    }

    public setPrice(price: IUnderlyingAsset['price']) {
        this.price = price

        return this
    }

    public setDividendYield(dividendYield: number): IUnderlyingAssetBuilder {
        this.dividendYield = dividendYield

        return this
    }

    public build(): IUnderlyingAsset {
        this.validate()
        const { name, volatility, price, dividendYield } = this

        return new UnderlyingAsset(name!, volatility!, price!, dividendYield!)
    }

    private validate() {
        if (!this.name) {
            throw new Error('Name is required')
        }

        if (!this.volatility) {
            throw new Error('Volatility is required')
        }

        if (!this.price) {
            throw new Error('Price is required')
        }
    }
}