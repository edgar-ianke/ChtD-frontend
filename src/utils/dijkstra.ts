type GraphWeightItem = { to: string; weight: number };
  type GraphWeight = Record<string, GraphWeightItem[]>;

  const graph: GraphWeight = {
    w: [
      { to: "x", weight: 2 },
      { to: "v", weight: 50 },
    ],
    v: [{ to: "z", weight: 24 }],
    x: [{ to: "y", weight: 1 }],
    y: [
      { to: "z", weight: 11 },
      { to: "maktama", weight: 8 },
    ],
    z: [{ to: "maktama", weight: 25 }],
    maktama: [{ to: "almet", weight: 1 }],
    almet: [{ to: "w", weight: 15 }],
  };
  export const dijkstra = (graph: GraphWeight, start: string): Record<string, number> | undefined => {
    const visited: Record<string, boolean> = { [start]: true };
    const queue = [[start, 0]];
    const dist: Record<any, any> = { 'w': 0 };
    while (queue.length) {
      const [curr, curWeight] = queue.shift()!;
      for (const edge of graph[curr]) {
        const { to, weight } = edge;
        const newDist = +curWeight + weight;
        if (!dist[to] || dist[to] > newDist) {
          dist[to] = newDist;
        }
        if (!visited[to]) {
          queue.push([to, newDist]);
        }
      }
      visited[curr] = true;
    }
    return dist;
  };