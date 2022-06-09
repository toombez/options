
import BinaryOptionTree, { IOptionTreeGeneratorOptions } from "../BinaryOptionTree";
import VTreeNode from '@/modules/trees/components/VTreeNode.vue'
import { IOptionForTree, OptionType } from "@/assets/types";
import { ITreesSettings, treesFunctions } from "../types";
import STree from "./STree";
import BinaryTreeNode from "../BinaryTreeNode";

export type VTreeData = {
    value: number,
    optimal: number | null
}

export interface IVTreeGeneratorOptions extends IOptionTreeGeneratorOptions {
    sTree: STree;
    settings: ITreesSettings;
}

export type VTreeGenerator = (options: IVTreeGeneratorOptions) => BinaryOptionTree<VTreeData>;

export default class VTree extends BinaryOptionTree<VTreeData> {

    public generate({ option, sTree, settings }: IVTreeGeneratorOptions): this {
        const layers: BinaryTreeNode<VTreeData>[][] = []

        sTree.layered.reverse().map((layer, index) => {
            if (index === 0) {
                const fn = functionsStorage.get(settings.function) as VTreeFunction

                const lastLayer = layer.map(node => {
                    return new BinaryTreeNode<VTreeData>({
                        value: fn(option, node),
                        optimal: null
                    })
                })
                layers.push(lastLayer)
                return
            }

            if (index < sTree.layered.length - 1) {
                if (option.type === OptionType.european) {
                    layers.push(this.generateEuropeanLayer(layer, layers[index - 1], option, settings))
                }
                if (option.type === OptionType.american) {
                    layers.push(this.generateAmericanLayer(layer, layers[index - 1], option, settings))
                }
            }
            if (index === sTree.layered.length - 1) {
                const { r, u, d } = option
                const p = (r - d) / (u - d)

                const previousLayer = layers[sTree.layered.length - 2]
                const value = 1 / (1 + r) * (p * previousLayer[0].data.value + (1 - p) * previousLayer[1].data.value)

                layers.push([
                    new BinaryTreeNode<VTreeData>({
                        optimal: null,
                        value: value
                    })
                ])
            }
        })

        layers

        this.generateFromLayers(layers, true)   

        return this
    }

    private generateEuropeanLayer(
        currentSTreeLayer: BinaryTreeNode<number>[],
        previousLayer: BinaryTreeNode<VTreeData>[],
        option: IOptionForTree,
        settings: ITreesSettings
    ) {
        const { r, u, d } = option
        const p = (r - d) / (u - d)

        return currentSTreeLayer.map((node, index) => {
            const value = 1 / (1 + r) * (p * previousLayer[index * 2].data.value + (1 - p) * previousLayer[index * 2 + 1].data.value)
            
            return new BinaryTreeNode<VTreeData>({
                optimal: null,
                value: value
            })
        })
    }
    private generateAmericanLayer(
        currentSTreeLayer: BinaryTreeNode<number>[],
        previousLayer: BinaryTreeNode<VTreeData>[],
        option: IOptionForTree,
        settings: ITreesSettings
    ) {
        const { r, u, d } = option
        const p = (r - d) / (u - d)

        const fn = functionsStorage.get(settings.function) as VTreeFunction

        return currentSTreeLayer.map((node, index) => {
            const optimal = 1 / (1 + r) * (p * previousLayer[index * 2].data.value + (1 - p) * previousLayer[index * 2 + 1].data.value)
            const value = Math.max(fn(option, node), optimal)

            return new BinaryTreeNode<VTreeData>({
                optimal: optimal,
                value: value
            })
        })
    }

    public dataComponent = VTreeNode;
}

type VTreeFunction = (option: IOptionForTree, node: BinaryTreeNode<number>) => number

export const functionsStorage = new Map<treesFunctions, VTreeFunction>()

functionsStorage.set(treesFunctions.func1, (option, node) => {
    const result = node.data - option.K
    return result > 0 ? result : 0
})

functionsStorage.set(treesFunctions.func2, (option, node) => {
    const result = option.K - node.data
    return result > 0 ? result : 0
})

functionsStorage.set(treesFunctions.func3, (option, node) => {
    const result = STree.S_(node) - option.K
    return result > 0 ? result : 0
})

functionsStorage.set(treesFunctions.func4, (option, node) => {
    const result = STree.S_(node) - node.data
    return result > 0 ? result : 0
})
