import { MathType } from "mathjs";
import { OptionGraphData } from '@/assets/types';
import Option from "../Option";

export default abstract class {
    constructor(
        public option: Option,
    ) {}

    public abstract calculateCallPrice(...args: unknown[]): MathType;
    public abstract calculatePutPrice(...args: unknown[]): MathType;
    public abstract generateGraphData(graphLength?: number): OptionGraphData;
}