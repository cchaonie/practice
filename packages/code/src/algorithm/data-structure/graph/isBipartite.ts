export function isBipartite(graph: number[][]): boolean {
    const NO_COLOR = 2;
    const RED = 1;
    const GREEN = 0;
    const toggleColor = current => (current === RED ? GREEN : RED);
    let currentColor = RED;
    const colors = new Array(graph.length).fill(NO_COLOR);
    const queue = [];
    for (let i = 0; i < colors.length; ++i) {
        if (colors[i] === NO_COLOR) {
            queue.push([i]);
            while (queue.length) {
                let neighborNodes = queue.shift();
                for (let j = 0; j < neighborNodes.length; ++j) {
                    const node = neighborNodes[j];
                    if (colors[node] === NO_COLOR) {
                        colors[node] = currentColor;
                        if (queue.length === 0) {
                            queue.push([]);
                        }
                        queue[queue.length - 1].push(...graph[node]);
                    } else if (colors[node] !== currentColor) {
                        return false;
                    }
                }
                currentColor = toggleColor(currentColor);
            }
        }
    }
    return true;
}
