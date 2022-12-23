import { IOptionForTree } from "@/assets/types";
import BinaryOptionTree, { IOptionTreeGeneratorOptions } from "../BinaryOptionTree";
import BinaryTreeNode from "../BinaryTreeNode";

import NumberNode from '../components/NumberNode.vue'

interface ISTreeGeneratorOptions extends IOptionTreeGeneratorOptions {
    layersCount: number
}

export default class STree extends BinaryOptionTree<number> {
    public dataComponent = NumberNode;
    
    generate({ option, layersCount }: ISTreeGeneratorOptions): this {
        this.root = new BinaryTreeNode<number>(option.S)

        this.BFS((node) => {
            // last layer index is less by one that layersCount
            if (node.layer === layersCount - 1) return 

            const upData = (1 + option.u) * node.data
            const downData = (1 + option.d) * node.data

            node.upChildren = new BinaryTreeNode(upData)
            node.downChildren = new BinaryTreeNode(downData)
        })

        return this
    }

    public static S_(node: BinaryTreeNode<number>) {
        let currentNode = node
        let result = currentNode.data
        let currentLayer = 0

        while(currentNode.parent) {
            result += currentNode.parent.data
            currentNode = currentNode.parent
            currentLayer++
        } 

        return result / (currentLayer + 1)
    }
}
