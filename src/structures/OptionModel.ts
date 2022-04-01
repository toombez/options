import { MathType } from "mathjs";
import Option from "./Option";

export default abstract class {
    constructor(
        public option: Option,
    ) {}

    public abstract calculateCallPrice(...args: unknown[]): MathType;
    public abstract calculatePutPrice(...args: unknown[]): MathType;
}