export default class Queue<DataType> {
    private storage = new Map<number, DataType>();
    private enqueuedIndex = 0;
    private dequeuedIndex = 0;

    public enqueue(data: DataType): void {
        this.storage.set(this.enqueuedIndex++, data)
    }

    public dequeue(): DataType | null {
        const deletedData = this.storage.get(this.dequeuedIndex)
        this.storage.delete(this.dequeuedIndex++)

        return deletedData as DataType
    }

    public get size(): number {
        return this.enqueuedIndex - this.dequeuedIndex
    }
}
