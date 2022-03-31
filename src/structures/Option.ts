import { IOptionOptions } from '@/assets/types';

export default class Option {
    static readonly DAYS_PER_YEAR: number = 360;
    // Значение рискового актива в начальный момент времени
    public readonly s0!: number;
    // Контрактная цена
    public readonly K!: number;
    // Безрисковая процентная ставка за период ∆t
    public readonly r!: number;
    // Волатильность
    public readonly sigma!: number;
    // Отношение дней до истечения срока опциона к дням в году
    private deltaT!: number;
    // Дата погашения
    public readonly T!: Date;

    constructor(options: IOptionOptions) {
        Object.assign(this, options);
        this.calculateDeltaT(options.T);
    }

    public get DeltaT() {
        return this.deltaT;
    }
    private calculateDeltaT(date: Date) {
        // dates with zero hours, mins, seconds, milliseconds
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const targetDay = new Date(date.setHours(0, 0, 0, 0));

        const differenceInTime = targetDay.getTime() - today.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        this.deltaT = differenceInDays / Option.DAYS_PER_YEAR;
    }
}