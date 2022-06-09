import {
    DateOptionParameters,
    NumberOptionParameters
} from "@/assets/RegistredOptionParameters"

type IOptionNumberParameters = {
    [numberParameter in NumberOptionParameters]?: number;
}
type IOptionDateParameters = {
    [dateParameter in DateOptionParameters]?: Date;
}
type IOptionOptionTypeParameter = {
    type?: OptionType
}
export type IOption = IOptionDateParameters &
    IOptionNumberParameters &
    IOptionOptionTypeParameter

export interface IComparingOptionGraphData {
    modelName: string;
    priceType: OptionPrice;
    data: number[];
}

export enum OptionPrice {
    call = 'колл',
    put = 'пут'
}

export enum OptionType {
    european = 'европейский',
    american = 'американский'
}

export interface IOptionForTree {
    S: number;
    K: number;
    r: number;
    u: number;
    d: number;
    type: OptionType;
}

export enum treeFunctions {
    '(SN - K)+' = 0,
    '(K - SN)+' = 1,
    '(S^- - K)+' = 2,
    '(S^- - SN)+' = 3,
}