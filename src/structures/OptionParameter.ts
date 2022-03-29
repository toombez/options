export default abstract class OptionParameter {
    constructor(
        public readonly type: string,
        public readonly name: string,
        public readonly value: number | string,
        public readonly description?: string,
        public readonly min?: number | string,
        public readonly max?: number | string,
        public readonly step?: number,
    ) {}
}