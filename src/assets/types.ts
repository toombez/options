export interface ILimits {
    start: number;
    end: number;
}

export enum DateOptionParameters {
    T = 'T'
}

export enum NumberOptionParameters {
    S = 'S',
    K = 'K',
    r = 'r',
    sigma = 'sigma',
    u = 'u',
    d = 'd'
}

// export const OptionParameters = Object.assign({}, DateOptionParameters, NumberOptionParameters)
export const OptionParameters = { ...DateOptionParameters, ...NumberOptionParameters}
export type OptionParameters = DateOptionParameters | NumberOptionParameters

export enum ParameterTypes {
    number = 'number',
    date = 'date',
}

export interface IOptionParameter {
    type: ParameterTypes;

    label: string;
    name: string;
    description?: string;
    
    min?: number;
    max?: number;
    step?: number;

    default: number;
}

export interface IOption {
    S: number;
    K: number;

    r?: number;
    sigma?: number;
    T?: Date;

    u?: number;
    d?: number;
}

export interface IOptionModelGraphData {
    label: string;
    callPrices: number[];
    putPrices: number[];
}

export interface IOptionParameterOptions {
    name: string;
    description?: string;
    value: number | string;
    min?: number | string;
    max?: number | string;
    step?: number;
    displayedName: string;
}

export interface OptionModelCache {
    call: Map<string, number>;
    put: Map<string, number>;
}

export interface IOptionModel {
    name: string;
    Option: IOption;
    Cache?: OptionModelCache;

    callPrice(...args: unknown[]): number;
    putPrice(...args: unknown[]): number;
}

export interface IOptionForModel {
    S: number;
    K: number;
    sigma: number;
    r: number;
    T: Date;
}

export enum OptionPrice {
    call = 'call',
    put = 'put'
}
