import Option from "./Option";

export default abstract class {
    constructor(
        public option: Option,
    ) {}

    public abstract calculateCallPrice(...args: unknown[]): number;
    public abstract calculatePutPrice(...args: unknown[]): number;
}