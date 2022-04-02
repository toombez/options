import { IOptionParameterOptions } from "@/assets/types";

export default abstract class OptionParameter<T extends string | number> {
    protected static count = 1;
    protected abstract readonly type: string;

    public readonly name!: string;
    public readonly description?: string;
    private id!: string;

    public value!: T;
    public readonly min?: T;
    public readonly max?: T;
    public readonly step?: number;

    constructor(options: IOptionParameterOptions) {
        Object.assign(this, options);

        this.id = this.generateID();
        this.increaseCount();
    }

    public get ID(): string {
        return this.id;
    }
    public get Type(): string {
        return this.type;
    }

    public abstract get Value(): number | string;
    public abstract set Value(value: number | string);
    protected abstract generateID(): string;
    protected abstract increaseCount(): void;


}