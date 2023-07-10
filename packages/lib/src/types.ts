/**
 * Underlying asset
 */
export interface IUnderlyingAsset {
    /**
     * Underlying asset name
     */
    name: string

    /**
     * Underlying asset price
     */
    price: number

    /**
     * Underlying asset volatility
     */
    volatility: number

    /**
     * Dividend yield
     */
    dividendYield: number
}

/**
 * Builder for underlying assets
 */
export interface IUnderlyingAssetBuilder {
    /**
     * Underlying asset name
     * @param name underlying asset name
     */
    setName(name: IUnderlyingAsset['name']): IUnderlyingAssetBuilder

    /**
     * Underlying asset price
     * @param price underlying asset price
     */
    setPrice(price: IUnderlyingAsset['price']): IUnderlyingAssetBuilder

    /**
     * Underlying asset volatility
     * @param volatility underlying asset volatility
     */
    setVolatility(
        volatility: IUnderlyingAsset['volatility']
    ): IUnderlyingAssetBuilder

    setDividendYield(dividendYield: number): IUnderlyingAssetBuilder

    /**
     * Build underlying asset
     */
    build(): IUnderlyingAsset
}

/**
 * Options type
 */
export type OptionType = 'CALL' | 'PUT'

/**
 * Option
 */
export interface IOption {
    /**
     * Underlying asset
     */
    underlyingAsset: IUnderlyingAsset

    /**
     * Underlying asset prices
     */
    underlyingPrice: number

    /**
     * Option type
     */
    type: OptionType

    /**
     * Expiration date
     */
    expirationDate: Date

    /**
     * Option date
     */
    date: Date

    /**
     * Strice price
     */
    strikePrice: number

    /**
     * Option premium
     */
    premium: number

    /**
     * Risk-free rate
     */
    riskFreeRate: number
}

export interface IOptionBuilder {
    /**
     * Set underlying asset
     * @param asset underlying asset
     */
    setUnderlyingAsset(asset: IOption['underlyingAsset']): IOptionBuilder

    /**
     * Set type
     * @param type option type
     */
    setType(type: OptionType): IOptionBuilder

    /**
     * Set expiration option date
     * @param date option expiration date
     */
    setExpirationDate(date: Date): IOptionBuilder

    /**
     * Set start date
     * @param date option start date
     */
    setDate(date: Date): IOptionBuilder

    /**
     * Set strike price
     * @param price strike price
     */
    setStrikePrice(price: number): IOptionBuilder

    /**
     * Set premium
     * @param premium premium
     */
    setPremium(premium: number): IOptionBuilder

    /**
     * Set rist-free rate
     * @param riskFreeRate risk-free rate
     */
    setRiskFreeRate(riskFreeRate: number): IOptionBuilder

    build(): IOption
}

export interface IModel {
    /**
     * Option put price
     */
    readonly putPrice: number

    /**
     * Option call price
     */
    readonly callPrice: number

    /**
     * Option
     */
    readonly option: IOption

    /**
     * Days in year
     */
    readonly DAYS_IN_YEAR: number

    /**
     * Percentage time delta
     */
    readonly percentageTimeDelta: number
}
