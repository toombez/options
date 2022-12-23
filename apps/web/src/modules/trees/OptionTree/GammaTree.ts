import { Component, ComputedOptions, MethodOptions } from "vue";
import BinaryOptionTree, { IOptionTreeGeneratorOptions } from "../BinaryOptionTree";

import NumberNode from '@/modules/trees/components/NumberNode.vue'

import STree from '@/modules/trees/OptionTree/STree'
import VTree from '@/modules/trees/OptionTree/VTree'
import BinaryTreeNode from "../BinaryTreeNode";

interface IGammaTreeGeneratorOptions extends IOptionTreeGeneratorOptions {
    sTree: STree,
    vTree: VTree
}

export default class GammaTree extends BinaryOptionTree<number> {
    public dataComponent = NumberNode;
    generate({ sTree, option, vTree }: IGammaTreeGeneratorOptions): this {
        const layers: BinaryTreeNode<number>[][] = []
        
        const sTreeLayers = sTree.layered
        const vTreeLayers = vTree.layered

        for (let i = 0; i < sTree.length - 1; i++) {
            layers.push(
                sTreeLayers[i].map((sTreeNode, nodeIndex) => {
                    const vTreeNode = vTreeLayers[i][nodeIndex]
                    
                    const upValue = vTreeNode.upChildren.data.value - vTreeNode.downChildren.data.value
                    const downValue = sTreeNode.upChildren.data - sTreeNode.downChildren.data
                    const value = upValue / downValue

                    return new BinaryTreeNode<number>(value)
                })
            )
        }

        this.generateFromLayers(layers)

        return this
    }

}