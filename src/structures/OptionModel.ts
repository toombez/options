import { OptionModelCache, IOptionForModel } from "@/assets/types";
import { MathType } from "mathjs";

export default abstract class OptionModel {
    protected static readonly DAYS_PER_YEAR = 360;

    protected option!: IOptionForModel;

    constructor(option: IOptionForModel) {
        this.Option = option
    }

    public set Option(option: IOptionForModel) {
        this.option = option
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
    private cache: OptionModelCache = {
        call: new Map<string, MathType>(),
        put: new Map<string, MathType>()
    }
    protected clearCache() {
        this.cache.call = new Map()
        this.cache.put = new Map()
    }
}