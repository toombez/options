export class Queue<DataType> {
    private storage = new Map<number, DataType>();
    private enqueueIndex = 0;
    private dequeueIndex = 0;

    public enqueue(data: DataType) {
        this.storage.set(this.enqueueIndex, data)
        this.enqueueIndex++
    }

    public dequeue() {
        if (this.size == 0) {
            return null;
        }

        const deletedData = this.storage.get(this.dequeueIndex);
        this.storage.delete(this.dequeueIndex);
        this.dequeueIndex++;

        return deletedData;
    }

    public get size(): number {
        return this.enqueueIndex - this.dequeueIndex
    }
}