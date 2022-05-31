import { IOptionForTree } from "@/assets/types";
import BinaryOptionTree from "../BinaryOptionTree";
import BinaryTreeNode from "../BinaryTreeNode";

import NumberNode from '../components/NumberNode.vue'

export default class STree extends BinaryOptionTree<number> {
    public dataComponent = NumberNode;
    
    generate(option: IOptionForTree, layers: number): this {
        this.root = new BinaryTreeNode<number>(option.S)

        this.BFS((node) => {
            if (node.layer < layers) {
                const upData = (1 + option.u) * node.data
                const downData = (1 + option.d) * node.data
                node.upChildren = new BinaryTreeNode(upData)
                node.downChildren = new BinaryTreeNode(downData)
            }
        })

        return this
    }

    public static S_(node: BinaryTreeNode<number>) {
        let currentNode = node
        let result = currentNode.data
        let layersCount = 1

        while(currentNode.parent) {
            result += currentNode.parent.data
            currentNode = currentNode.parent
            layersCount++
        } 

        return result / (layersCount)
    }
}
