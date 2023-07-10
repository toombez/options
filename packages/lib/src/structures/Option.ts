import { IOption, IUnderlyingAsset, OptionType } from '../types';

export default class Option implements IOption {
    public constructor(
        public type: OptionType,
        public underlyingAsset: IUnderlyingAsset,
        public premium: number,
        public strikePrice: number,
        public riskFreeRate: number,
        public expirationDate: Date,
        public date: Date = new Date(),
    ) {}

    public get underlyingPrice(): number {
        return this.underlyingAsset.price
    }
}
