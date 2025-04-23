export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const parent: number[] = new Array(arr.length).fill(-1);
    const visited: boolean[] = new Array(arr.length).fill(false);
    const distances: number[] = new Array(arr.length).fill(Infinity);
    distances[source] = 0;

    const hasUnvisitedNode = (): boolean => {
        for (let i = 0; i < arr.length; ++i) {
            const isWeightUpdated = distances[i] !== Infinity;
            if (isWeightUpdated && !visited[i]) return true;
        }
        return false;
    };
    const getLowestUnvisitedNodeIndex = (): number => {
        let lowest = Infinity;
        let idx = -1;
        for (let i = 0; i < arr.length; ++i) {
            if (visited[i]) continue;
            const value = distances[i];
            if (value > lowest) continue;

            lowest = value;
            idx = i;
        }
        return idx;
    };
    while (hasUnvisitedNode()) {
        const lowestIndex = getLowestUnvisitedNodeIndex();
        const row = arr[lowestIndex];

        for (let i = 0; i < row.length; ++i) {
            const nextNode = row[i];
            const nextIndex = nextNode.to;
            const newDistance = distances[lowestIndex] + nextNode.weight;
            const oldDistance = distances[nextIndex];
            if (newDistance < oldDistance) {
                distances[nextIndex] = newDistance;
                parent[nextIndex] = lowestIndex;
            }
        }
        visited[lowestIndex] = true;
    }

    let curr = sink;
    const path: number[] = [];
    while (parent[curr] !== -1) {
        path.push(curr);
        curr = parent[curr];
    }
    if (!path.length) return [];
    path.push(source);
    return path.reverse();
}
