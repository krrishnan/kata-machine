export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue: (BinaryNode<number> | undefined)[] = [];
    queue.push(head);

    while (queue.length) {
        const curr = queue.shift();
        if (!curr) return false;
        if (curr.value === needle) return true;

        curr.left && queue.push(curr.left);
        curr.right && queue.push(curr.right);
    }
    return false;
}
