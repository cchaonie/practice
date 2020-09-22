import { BinaryTreeNode } from "./BinarySearchTree";

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
export const convertBST = function (root: BinaryTreeNode<number> | null): BinaryTreeNode<number> | null {
    const convertWithParent = (node: BinaryTreeNode<number> | null, parent?: BinaryTreeNode<number> | null) => {
        if (!node) return null;
        if (node.right) {
            if (parent) {
                node.val = convertWithParent(node.right).val + node.val + parent.val;
            } else {
                node.val = convertWithParent(node.right).val + node.val;
            }
        }
        node.left = convertWithParent(node.left, node);
        return node;
    };
    return convertWithParent(root);
};
