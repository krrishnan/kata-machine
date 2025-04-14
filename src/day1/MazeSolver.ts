const direction = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];
const walk = (
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    visited: boolean[][],
    path: Point[],
): boolean => {
    const mazeVerticalLength = maze.length;
    const mazeHorizontalLength = maze[0].length;

    //Base cases
    //Index out of bound
    if (
        curr.x < 0 ||
        curr.x >= mazeHorizontalLength ||
        curr.y < 0 ||
        curr.y >= mazeVerticalLength
    ) {
        return false;
    }

    //Wall detected
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    //Already visited
    if (visited[curr.y][curr.x]) {
        return false;
    }

    //We found end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);

        return true;
    }

    //Recursion
    //Before

    visited[curr.y][curr.x] = true;

    path.push(curr);

    //Recurse
    for (let i = 0; i < direction.length; ++i) {
        const [x, y] = direction[i];
        const next = { x: curr.x + x, y: curr.y + y };

        if (walk(maze, wall, next, end, visited, path)) return true;
    }

    //After
    path.pop();
    return false;
};
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const visited = [];
    const row = Array.from(new Array(maze[0].length)).fill(false);
    for (let i = 0; i < maze.length; ++i) {
        visited.push([...row]);
    }
    const path: Point[] = [];
    walk(maze, wall, start, end, visited, path);

    return path;
}
