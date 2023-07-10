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

    /**
     * Build underlying asset
     */
    build(): IUnderlyingAsset
}
