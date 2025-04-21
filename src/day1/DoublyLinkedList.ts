type Node<T> = { value: T; next?: Node<T>; prev?: Node<T> };
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item, next: undefined, prev: undefined };
        this.length++;

        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) this.prepend(item);
        if (idx === length) this.append(item);

        let curr = this.getAt(idx);
        this.length++;
        curr = curr as Node<T>;
        const node: Node<T> = { value: item, next: undefined, prev: undefined };
        node.next = curr;
        curr.prev = node;
        curr.prev.next = node;
        node.prev = curr.prev;
    }
    append(item: T): void {
        const node: Node<T> = { value: item, next: undefined, prev: undefined };
        this.length++;

        if (!this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) return undefined;

        this.length--;
        if (curr === this.head) {
            this.head = this.head.next;
            if (this.head) this.head.prev = undefined;
        } else if (curr === this.tail) {
            this.tail = this.tail.prev;
            if (this.tail) this.tail.next = undefined;
        } else if (curr.prev && curr.next) {
            curr.prev.next = curr.next;
            curr.next.prev = curr.prev;
            curr.next = curr.prev = undefined;
        }

        return curr.value;
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }
    removeAt(idx: number): T | undefined {
        const curr = this.getAt(idx);
        if (!curr) return undefined;

        this.length--;

        if (idx === 0 && this.head) {
            this.head = this.head.next;
            if (this.head) this.head.prev = undefined;
        } else if (idx === this.length && this.tail) {
            this.tail = this.tail.prev;
            if (this.tail) this.tail.next = undefined;
        } else if (curr.prev && curr.next) {
            curr.prev.next = curr.next;
            curr.next.prev = curr.prev;
            curr.next = curr.prev = undefined;
        }
        return curr?.value;
    }
}
