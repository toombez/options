import { IUnderlyingAsset } from '../types'

export default class UnderlyingAsset implements IUnderlyingAsset {
    constructor(
        public name: string,
        public volatility: number,
        public price: number,
    ) {}
}
