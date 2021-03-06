import OptionParameters from '@/assets/RegistredOptionParameters'

export interface IOptionParameter<T> {
    name: OptionParameters;
    label: string;
    description: string;

    defaultValue: T;
    min?: T;
    max?: T;
    step?: number;
}

export default abstract class OptionParameter<T> implements IOptionParameter<T> {
    static registred = new Map<OptionParameters, OptionParameter<unknown>>();
    
    public readonly label!: string;
    public readonly name!: OptionParameters;
    public readonly description!: string;

    public readonly defaultValue!: T;
    public readonly min?: T | undefined;
    public readonly max?: T | undefined;
    public readonly step?: number;

    constructor(parameter: IOptionParameter<T>) {
        const registred = OptionParameter.registred.get(parameter.name)
        if (registred) {
            throw new Error(`"${parameter.name}" option parameter already registred.`)
        }

        Object.assign(this, parameter)
        OptionParameter.registred.set(parameter.name, this)
    }

    public abstract type: string;

    public abstract get Min(): number | string | undefined;

    public abstract get Max(): number | string | undefined;

    public abstract get defaultRawValue(): string;

    abstract fromRaw(rawValue: string): T;
}
