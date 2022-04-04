export type LimitsType = { start: number, end: number };

export interface IOptionOptions {
    s0: number,
    K: number
    r: number
    sigma: number,
    T: Date,
}

export type OptionGraphData = {
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