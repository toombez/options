import DateOptionParameter from "@/structures/OptionParameters/DateOptionParameter"
import NumberOptionParameter from "@/structures/OptionParameters/NumberOptionParameter"
import OptionTypeOptionParameter from "@/structures/OptionParameters/OptionTypeOptionParameter"
import { OptionType } from "./types"

export enum NumberOptionParameters {
    S = 'S',
    K = 'K',
    sigma = 'sigma',
    r = 'r'
}

export enum DateOptionParameters {
    T = 'T'
}
export enum OptionTypeOptionParameters {
    type = 'type'
}

new NumberOptionParameter({
    name: NumberOptionParameters.S,
    label: 'S',
    description: 'Значение рискового актива в начальный момент времени',
    defaultValue: 100,
    step: 10,
    min: 0
})
new NumberOptionParameter({
    name: NumberOptionParameters.K,
    label: 'K',
    description: 'Контрактная цена',
    defaultValue: 100,
    step: 10,
    min: 0,
})
new NumberOptionParameter({
    name: NumberOptionParameters.sigma,
    label: '\u03C3',
    description: 'Волатильность',
    defaultValue: 0.1,
    max: 1,
    min: 0,
    step: 0.1
})
new NumberOptionParameter({
    name: NumberOptionParameters.r,
    label: 'r',
    description: 'Безрисковая процентная ставка за период ∆t',
    defaultValue: 0.1,
    max: 1,
    min: 0,
    step: 0.1
})
new DateOptionParameter({
    name: DateOptionParameters.T,
    label: 'T',
    description: 'Дата погашения',
    defaultValue: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 90
    ),
    min: new Date()
})
new OptionTypeOptionParameter({
    name: OptionTypeOptionParameters.type,
    label: 'Тип опциона',
    description: 'Тип опциона',
    defaultValue: OptionType.european
})

export const OptionParameters = {
    ...NumberOptionParameters,
    ...DateOptionParameters,
    ...OptionTypeOptionParameters,
}
export type OptionParameters = NumberOptionParameters |
    DateOptionParameters |
    OptionTypeOptionParameters

export default OptionParameters
