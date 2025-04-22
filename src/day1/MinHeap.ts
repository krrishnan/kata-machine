export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) return -1;

        const out = this.data[0];
        this.data[0] = this.data[this.length - 1];
        this.length--;
        this.heapifyDown(0);
        return out;
    }

    heapifyDown(idx: number): void {
        const leftIndex = this.leftChild(idx);
        const rightIndex = this.rightChild(idx);
        const leftValue = this.data[leftIndex];
        const rightValue = this.data[rightIndex];
        const value = this.data[idx];

        if (idx >= this.length || leftIndex >= this.length) return;

        if (value > leftValue && leftValue < rightValue) {
            this.data[idx] = leftValue;
            this.data[leftIndex] = value;
            this.heapifyDown(leftIndex);
        } else if (value > rightValue && rightValue < leftValue) {
            this.data[idx] = rightValue;
            this.data[rightIndex] = value;
            this.heapifyDown(rightIndex);
        }
    }

    heapifyUp(idx: number): void {
        if (idx === 0) return;
        const parentIndex = this.parent(idx);
        const parentValue = this.data[parentIndex];
        const value = this.data[idx];

        if (parentValue <= value) return;

        this.data[parentIndex] = value;
        this.data[idx] = parentValue;
        this.heapifyUp(parentIndex);
    }

    parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    leftChild(idx: number): number {
        return 2 * idx + 1;
    }
    rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}
