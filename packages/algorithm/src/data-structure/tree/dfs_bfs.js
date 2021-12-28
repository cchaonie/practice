// 树的遍历，每个节点有一个保存子节点的列表children

// deep first search
function dfs(tree, result=[]) {
  result.push(tree.name)
  const children = tree.children ? tree.children : [];
  for (let child of children) {
    dfs(child, result)
  }
  return result;
}

// breadth first search
function bfs(tree, result=[]) {
  const queue = [];
  queue.push(tree);
  while(queue.length > 0) {
    let current = queue.shift();
    result.push(current.name);
    const children = current.children ? current.children : [];
    for (let child of children) {
      queue.push(child);
    }
  }
  return result;
}

const graph = {
  name: 'l11',
  children: [
    {
      name: 'l21',
      children: [
        {
          name: 'l31',
        }
      ]
    },
    {
      name: 'l22',
      children: [
        {
          name: 'l32',
          children: [
            {
              name: 'l41',
            }
          ]
        },
        {
          name: 'l33',
          children: [
            {
              name: 'l42'
            }
          ]
        },
        {
          name: 'l34',
        }
      ]
    }
  ]
}

// dfsResult = dfs(graph)
bfsResult = bfs(graph)
// console.log(dfsResult)
console.log(bfsResult)