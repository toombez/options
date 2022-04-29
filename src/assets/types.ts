export type LimitsType = { start: number, end: number };

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

export type OptionGraphData = {
    label: string,
    lineColor: string,
    pointStyle: string,
    call: unknown[],
    put: unknown[],
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