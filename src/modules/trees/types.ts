import BinaryTreeNode from "./BinaryTreeNode";

export type layeredTree<DataType> = BinaryTreeNode<DataType>[][];

export type flattenTree<DataType> = BinaryTreeNode<DataType>[];

export type treeLayer<DataType> = BinaryTreeNode<DataType>[];

/** TODO
 *  make easily function adding process
 */
export enum treesFunctions {
    func1 = "(Sn-K)+",
    func2 = "(K-Sn)+",
    func3 = "(`S-K)+",
    func4 = "(`S-Sn)+"
}

export interface ITreesSettings {
    layersCount: number;
    function: treesFunctions;
}
