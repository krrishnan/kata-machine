export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const queue: number[] = [source];
    const visited: boolean[] = new Array(graph.length).fill(false);
    const parent: number[] = new Array(graph.length).fill(-1);

    do {
        const curr = queue.shift() as number;
        visited[curr] = true;
        if (curr === needle) break;

        const adjacents = graph[curr];
        for (let i = 0; i < adjacents.length; ++i) {
            if (visited[i]) continue;
            if (adjacents[i] === 0) continue;

            parent[i] = curr;
            queue.push(i);
        }
    } while (queue.length);

    const path: number[] = [];
    let curr = needle;
    while (parent[curr] !== -1) {
        path.push(curr);
        //console.log("CURR", curr, "PARENT", parent[curr], "PATH", path);
        curr = parent[curr];
    }

    if (!path.length) return null;
    path.push(source);
    path.reverse();
    return path;
}
