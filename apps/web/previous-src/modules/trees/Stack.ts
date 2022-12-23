export default class Stack<DataType> {
    private storage = new Map<number, DataType>();
    private pushedIndex = 0;

    public push(data: DataType) {
        this.storage.set(this.pushedIndex++, data)
    }

    public pop(): DataType | null {
        const poppedKey = Math.max(...this.storage.keys())

        const data = this.storage.get(poppedKey)
        this.storage.delete(poppedKey)
        /**
         * data possible be null if storage is empty
         */
        return data as DataType
    }

    public get size(): number {
        return this.storage.size
    }
}
