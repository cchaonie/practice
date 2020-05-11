import { BinaryTreeNode } from "./Tree";

export function layerTraverse(root: BinaryTreeNode<number>): number[] {
  if (!root) return [];
  let result: number[] = [];
  let queue: BinaryTreeNode<number>[] = [];
  queue.push(root);
  while (queue.length) {
    let front = queue.shift() as BinaryTreeNode<number>;
    result.push(front.key);
    if (front.left) queue.push(front.left);
    if (front.right) queue.push(front.right);
  }
  return result;
}
