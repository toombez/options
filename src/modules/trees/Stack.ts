export default class Stack<DataType> {
    private storage = new Map<number, DataType>();

    public push(data: DataType) {
        this.storage.set(this.size, data)
    }

    public pop(): DataType | null {
        const data = this.storage.get(this.size)
        /**
         * data possible be null
         */
        return data as DataType
    }

    public get size(): number {
        return this.storage.size
    }
}