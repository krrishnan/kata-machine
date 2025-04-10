type Node<T> = { value: T; prev?: Node<T> };
export default class Stack<T> {
    public length: number;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        const node: Node<T> = { value: item, prev: undefined };
        this.length++;
        if (this.length === 1) this.tail = node;
        else {
            if (!this.tail) return;
            node.prev = this.tail;
            this.tail = node;
        }
    }
    pop(): T | undefined {
        if (!this.tail) return undefined;
        this.length--;
        const node = this.tail;
        this.tail = this.tail.prev;
        node.prev = undefined;
        return node.value;
    }
    peek(): T | undefined {
        return this.tail?.value;
    }
}
