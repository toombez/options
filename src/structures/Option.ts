export default class Option {
    private deltaT!: number;
    constructor(
        // Значение рискового актива в начальный момент времени
        public readonly s0: number,
        // Контрактная цена
        public readonly K: number,
        // Безрисковая процентная ставка за период ∆t
        public readonly r: number,
        // Волатильность
        public readonly sigma: number,
        // Дата погашения
        public readonly t: Date
    ) {
        this.calculateDeltaT(t);
    }

    private calculateDeltaT(date: Date) {
        const today = new Date();
        const targetDay = date;

        const differenceInTime = targetDay.getTime() - today.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        this.deltaT = differenceInDays;
    }
}