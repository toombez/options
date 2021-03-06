import Queue from "./Queue";
import BinaryTreeNode from "./BinaryTreeNode";
import { flattenTree, layeredTree, treeLayer } from "./types";
import { Component } from "vue";
import { IOptionForTree } from "@/assets/types";

type BFSCallback<DataType> = (node: BinaryTreeNode<DataType>) => void

export interface IOptionTreeGeneratorOptions {
    option: IOptionForTree
}

interface IBinaryTree<DataType> {
    generate: (options: IOptionTreeGeneratorOptions) => this;
    root: BinaryTreeNode<DataType> | null;
    length: number;
    flatten: flattenTree<DataType>;
    layered: layeredTree<DataType>;
    getLayer: (layer: number) => treeLayer<DataType> | null;
    dataComponent: Component;
}

export default abstract class BinaryOptionTree<DataType> implements IBinaryTree<DataType> {
    private _root: BinaryTreeNode<DataType> | null = null;

    public abstract readonly dataComponent: Component;

    abstract generate(options: IOptionTreeGeneratorOptions): this;

    public generateFromLayers(layers: BinaryTreeNode<DataType>[][], isReversed = false) {
        if (isReversed) layers.reverse()

        layers.forEach((layer, layerIndex) => {
            if (layerIndex === layers.length - 1) return

            layer.forEach((node, nodeIndex) => {
                node.upChildren = layers[layerIndex + 1][nodeIndex * 2]
                node.downChildren = layers[layerIndex + 1][nodeIndex * 2 + 1]
            })
        })

        this.root = layers[0][0] 
    }

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
            const layer = this.getLayer(i)
            if (layer) layers.push(layer)
        }
        return layers
    }

    public getLayer(layer: number): treeLayer<DataType> | null {
        const layerNodes = this.flatten.filter(node => node.layer == layer)

        if (layerNodes.length === 0) return null;
        return layerNodes
    }

    public get length(): number {
        let currentlength = 0

        while (this.getLayer(currentlength)) {
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
