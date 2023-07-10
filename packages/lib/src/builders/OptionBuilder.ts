import Option from '@structures/Option';
import { IOption, IOptionBuilder, IUnderlyingAsset, OptionType } from '@types';

export default class OptionBuilder implements IOptionBuilder {
    protected underlyingAsset?: IUnderlyingAsset
    protected type?: OptionType
    protected date?: Date
    protected expirationDate?: Date
    protected strikePrice?: number
    protected premium?: number
    protected riskFreeRate?: number

    setUnderlyingAsset(asset: IUnderlyingAsset): IOptionBuilder {
        this.underlyingAsset = asset

        return this
    }

    setType(type: OptionType): IOptionBuilder {
        this.type = type

        return this
    }

    setExpirationDate(date: Date): IOptionBuilder {
        this.expirationDate = date

        return this
    }

    setDate(date: Date): IOptionBuilder {
        this.date = date

        return this
    }

    setStrikePrice(price: number): IOptionBuilder {
        this.strikePrice = price

        return this
    }

    setPremium(premium: number): IOptionBuilder {
        this.premium = premium

        return this
    }

    setRiskFreeRate(riskFreeRate: number): IOptionBuilder {
        this.riskFreeRate = riskFreeRate

        return this
    }

    build(): IOption {
        this.validate()

        return new Option(
            this.type!,
            this.underlyingAsset!,
            this.premium!,
            this.strikePrice!,
            this.riskFreeRate!,
            this.expirationDate!,
            this.date!,
        )
    }

    protected validate() {
        if (!this.type) {
            throw new Error('Type is required')
        }

        if (!this.underlyingAsset) {
            throw new Error('Underlying asset is required')
        }

        if (!this.premium) {
            throw new Error('Premium is required')
        }

        if (!this.strikePrice) {
            throw new Error('Strike price is required')
        }

        if (!this.riskFreeRate) {
            throw new Error('Risk-free rate is required')
        }

        if (!this.expirationDate) {
            throw new Error('Expiration date is required')
        }
    }
}
