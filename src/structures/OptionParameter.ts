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

    public abstract formatValue(): number | Date;
    protected abstract generateID(): string;
    protected abstract increaseCount(): void;
}

export class NumberOptionParameter extends OptionParameter<number> {
    protected readonly type: string = 'number';

    protected generateID(): string {
        return `${this.name}-parameter-${NumberOptionParameter.count}`;
    }
    protected increaseCount(): void {
        NumberOptionParameter.count++;
    }
    public formatValue(): number {
        return this.value;
    }
}

export class DateOptionParameter extends OptionParameter<string> {
    protected readonly type = 'date';

    protected generateID(): string {
        return `${this.name}-parameter-${DateOptionParameter.count}`;
    }
    protected increaseCount(): void {
        DateOptionParameter.count++;
    }
    public formatValue(): number | Date {
        return new Date(this.value);
    }
}