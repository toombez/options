import OptionParameter from "@/structures/OptionParameter"
import { OptionType } from "@/assets/types"

export default class OptionTypeOptionParameter extends OptionParameter<OptionType> {
    public type = 'optionType';

    public get Min(): undefined { return undefined }
    public get Max(): undefined { return undefined }
    public get defaultRawValue(): string { return this.defaultValue.toString() }
    fromRaw(rawValue: string): OptionType { return rawValue as OptionType }
}