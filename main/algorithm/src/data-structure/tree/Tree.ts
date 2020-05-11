export interface TreeNode<T> {
  key: T;
}
export interface Tree<T> {
  insert(key: T): void;
  search(key: T): TreeNode<T> | null;
  remove(key: T): void;
}

export interface BinaryTreeNode<T> extends TreeNode<T> {
  left: BinaryTreeNode<T>;
  right: BinaryTreeNode<T>;
}
