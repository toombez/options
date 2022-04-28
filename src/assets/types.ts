export type LimitsType = { start: number, end: number };

export enum OptionParameters {
    S = 'S',
    K = 'K',
    T = 'T',
    r = 'r',
    sigma = 'sigma',
    u = 'u',
    d = 'd'
}

export interface IOptionOptions {
    s0: number,
    K: number
    r: number
    sigma: number,
    T: Date,
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