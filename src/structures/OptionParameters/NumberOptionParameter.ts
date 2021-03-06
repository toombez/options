import OptionParameter from "@/structures/OptionParameter";

export default class NumberOptionParameter extends OptionParameter<number> {
    public get Max(): number | undefined { return this.max }
    public get Min(): number | undefined { return this.min }

    public type = 'number';

    public get defaultRawValue(): string {
        return this.defaultValue.toString()
    }

    fromRaw(rawValue: string): number {
        return +rawValue;
    }
}