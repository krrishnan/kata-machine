function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    visited: boolean[],
    path: number[],
): boolean {
    if (curr === needle) {
        path.push(curr);
        return true;
    }
    if (visited[curr]) return false;

    visited[curr] = true;
    path.push(curr);
    const currentRow = graph[curr];
    for (let i = 0; i < currentRow.length; ++i) {
        if (walk(graph, currentRow[i].to, needle, visited, path)) return true;
    }
    path.pop();
    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const visited: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];
    walk(graph, source, needle, visited, path);

    if (!path.length) return null;
    return path;
}
