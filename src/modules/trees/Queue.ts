export class Queue<DataType> {
    private storage: (DataType | null)[] = [];
    private realIndex = 0;

    public enqueue(data: DataType) {
        this.storage.push(data)
    }

    public dequeue() {
        const data = this.storage[this.realIndex]
        
        if (!data) return null
        this.storage[this.realIndex] = null
        this.realIndex++
        return data
    }
    public get size(): number {
        return this.storage.length - this.realIndex
    }
}