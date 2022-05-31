import BinaryTreeNode from "./BinaryTreeNode";

export type layeredTree<DataType> = BinaryTreeNode<DataType>[][];

export type flattenTree<DataType> = BinaryTreeNode<DataType>[];

export type treeLayer<DataType> = BinaryTreeNode<DataType>[];
