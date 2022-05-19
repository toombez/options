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

export interface ILimits {
    start: number;
    end: number;
}

export interface IComparingOptionGraphData {
    modelName: string;
    priceType: OptionPrice;
    data: number[];
}

export interface IOptionForModel {
    S: number;
    K: number;
    sigma: number;
    r: number;
    T: Date;
}

export enum OptionPrice {
    call = 'колл',
    put = 'пут'
}

export type treeData = number[][];

export interface ITree {
    name: string;
    data: treeData;
}

export type rawTree = number[]

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
}

export enum treeFunctions {
    '(SN - K)+' = 0,
    '(K - SN)+' = 1,
    '(S^- - K)+' = 2,
    '(S^- - SN)+' = 3,
}