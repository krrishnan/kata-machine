type Node<T> = { prev?: Node<T>; value: T; next?: Node<T> };
export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;
    private capacity: number;

    constructor(capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
        this.capacity = capacity;
    }

    update(key: K, value: V): void {
        const node = this.getNode(key);
        if (node) {
            node.value = value;
            return;
        }

        const newNode = { value };
        this.lookup.set(key, newNode);
        this.reverseLookup.set(newNode, key);
        this.prepend(newNode);
        this.length++;

        if (this.length <= this.capacity) return; //Within our capacity so leave it

        //Newly added and exceeds capacity
        this.trimEnd();
    }
    get(key: K): V | undefined {
        return this.getNode(key)?.value;
    }
    private getNode(key: K): Node<V> | undefined {
        const node = this.lookup.get(key);
        if (!node) return undefined;

        this.detach(node);
        this.prepend(node);
        return node;
    }

    private detach(node: Node<V>) {
        if (node.prev && node.next) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            node.prev = undefined;
            node.next = undefined;
        }

        if (node === this.head) {
            this.head = this.head.next;
            node.next = undefined;
            return;
        }
        if (node === this.tail) {
            this.tail = this.tail.prev;
            node.prev = undefined;
            return;
        }
    }
    private prepend(node: Node<V>) {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }
    private trimEnd() {
        if (!this.tail) return;
        const tail = this.tail;
        this.tail = this.tail.prev;
        if (this.tail) this.tail.next = undefined;
        tail.prev = undefined;

        const key = this.reverseLookup.get(tail) as K;
        console.log("deleting key", key);
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        console.log("Lookup after deletion", this.lookup);
        this.length--;
    }
}
