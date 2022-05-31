import Queue from "./Queue";
import BinaryTreeNode from "./BinaryTreeNode";
import { flattenTree, layeredTree, treeLayer } from "./types";
import { Component } from "vue";

type BFSCallback<DataType> = (node: BinaryTreeNode<DataType>) => void

interface IBinaryTree<DataType> {
    root: BinaryTreeNode<DataType> | null;
    length: number;
    flatten: flattenTree<DataType>;
    layered: layeredTree<DataType>;
    layer: (layer: number) => treeLayer<DataType> | null;
    dataComponent: Component;
}

export default abstract class BinaryOptionTree<DataType> implements IBinaryTree<DataType> {
    private _root: BinaryTreeNode<DataType> | null = null;

    public abstract readonly dataComponent: Component;

    abstract generate(...args: unknown[]): this;

    public BFS(callback: BFSCallback<DataType> | null): void {

        const treeQueue = new Queue<BinaryTreeNode<DataType>>()

        if (!this.root) throw new Error('Call generate before use BFS') 

        let currentTree: BinaryTreeNode<DataType> | null = this.root
        while (currentTree) {
            callback?.call(this, currentTree)

            if (currentTree.upChildren) treeQueue.enqueue(currentTree.upChildren)
            if (currentTree.downChildren) treeQueue.enqueue(currentTree.downChildren)

            currentTree = treeQueue.dequeue()
        }
    }

    public get flatten(): flattenTree<DataType> {
        const nodes: flattenTree<DataType> = []
        this.BFS(function (node) {
            nodes.push(node)
        })
        return nodes
    }
    public get layered(): layeredTree<DataType> {
        const layers: layeredTree<DataType> = []
        for(let i = 0; i < this.length; i++) {
            const layer = this.layer(i)
            if (layer) layers.push(layer)
        }
        return layers
    }

    public layer(layer: number): treeLayer<DataType> | null {
        const layerNodes = this.flatten.filter(node => node.layer == layer)

        if (layerNodes.length === 0) return null;
        return layerNodes
    }

    public get length(): number {
        let currentlength = 0

        while (this.layer(currentlength)) {
            ++currentlength
        }

        return currentlength
    }

    public get root(): BinaryTreeNode<DataType> {
        return this._root as BinaryTreeNode<DataType>
    }
    protected set root(node: BinaryTreeNode<DataType>) {
        this._root = node
    }
}
