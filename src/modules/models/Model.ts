import { IOptionForModel, IOption } from "@/assets/types"

export interface OptionModelCache {
    call: Map<string, number>;
    put: Map<string, number>;
}

export interface IOptionModel {
    Option: IOption;
    Cache?: OptionModelCache;

    callPrice(...args: unknown[]): number;
    putPrice(...args: unknown[]): number;
}

export default abstract class OptionModel implements IOptionModel {
    protected static readonly DAYS_PER_YEAR = 360;

    constructor(option: IOptionForModel) {
        this.Option = option
    }
    Cache?: OptionModelCache | undefined;

    public set Option(option: IOptionForModel) {
        this.option = option

        this.clearCache()
    }
    public get Option(): IOptionForModel {
        return this.option
    }
    protected get OptionDeltaT() {
        const today = new Date(new Date().setHours(0, 0, 0, 0))
        const targetDate = this.option.T

        const differenceInTime = targetDate.getTime() - today.getTime()
        const differenceInDays = differenceInTime / (1000 * 3600 * 24)
        return differenceInDays / OptionModel.DAYS_PER_YEAR
    }
    protected cache: OptionModelCache = {
        call: new Map<string, number>(),
        put: new Map<string, number>()
    }
    protected clearCache() {
        this.cache.call = new Map()
        this.cache.put = new Map()
    }

    abstract callPrice(...args: unknown[]): number;
    abstract putPrice(...args: unknown[]): number;

    private option!: IOptionForModel;
}