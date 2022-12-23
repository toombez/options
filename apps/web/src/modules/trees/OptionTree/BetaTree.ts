import { Component, ComputedOptions, MethodOptions } from "vue";
import BinaryOptionTree, { IOptionTreeGeneratorOptions } from "../BinaryOptionTree";

import NumberNode from '@/modules/trees/components/NumberNode.vue'

import STree from '@/modules/trees/OptionTree/STree'
import VTree from '@/modules/trees/OptionTree/VTree'
import BinaryTreeNode from "../BinaryTreeNode";
import GammaTree from "./GammaTree";

interface IBetaTreeGeneratorOptions extends IOptionTreeGeneratorOptions {
    sTree: STree;
    vTree: VTree;
    gammaTree: GammaTree;
}

export default class BetaTree extends BinaryOptionTree<number> {
    public dataComponent = NumberNode;
    generate({ option, gammaTree, sTree, vTree }: IBetaTreeGeneratorOptions): this {
        const { r } = option
        
        const layers: BinaryTreeNode<number>[][] = []

        const sTreeLayers = sTree.layered
        const vTreeLayers = vTree.layered
        const gammaTreeLayers = gammaTree.layered

        for (let i = 0; i < sTree.length - 1; i++) {
            layers.push(
                sTreeLayers[i].map((sTreeNode, nodeIndex) => {
                    const vTreeNode = vTreeLayers[i][nodeIndex]
                    const gammaTreeNode = gammaTreeLayers[i][nodeIndex]
                    
                    const value = 1 / ((1 + r) ** i) * (vTreeNode.data.value - gammaTreeNode.data * sTreeNode.data)
                    return new BinaryTreeNode<number>(value)
                })
            )
        }

        this.generateFromLayers(layers)

        return this
    }
}