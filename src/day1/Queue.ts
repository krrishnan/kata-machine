type Node<T> = { value: T; next?: Node<T> };
export default class Queue<T> {
    public length: number;

    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node: Node<T> = { value: item, next: undefined };
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }
    deque(): T | undefined {
        if (!this.head) return undefined;
        const node = this.head;
        this.head = this.head.next;
        node.next = undefined;
        return node.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
