import { IOptionModel, IComparingOptionGraphData, OptionPrice } from "@/assets/types";

export default abstract class OptionCalculator {
    public static graphDataForComparing(
        models: IOptionModel[],
        priceTypes: OptionPrice[],
        graphLength: number
    ): IComparingOptionGraphData[] {
        const result: IComparingOptionGraphData[] = []

        for (const model of models.values()) {
            for (const priceType of priceTypes.values()) {
                const modelName = model.name
                const data: number[] = this.callPrices(model, priceType, graphLength)

                result.push({
                    modelName,
                    data,
                    priceType
                })
            }
        }

        return result
    }
    private static treeFromRaw(rawTree: rawTree): treeData {
        const tree: treeData = [[]]

        let layerIndex = 0
        let nodeIndex = 0

        for (let i = 1; i < rawTree.length; i++) {
            const nodeValue = rawTree[i]

            if (nodeValue == null) continue
            if (nodeIndex === 2 ** layerIndex) {
                tree.push([])
                layerIndex++
                nodeIndex = 0
            }
            if (nodeIndex !== 2 ** layerIndex) {
                tree[layerIndex].push(nodeValue)
                nodeIndex++
            }
        }
        return tree
    }
    private static callPrices(
        model: IOptionModel,
        priceType: OptionPrice,
        graphLength: number
    ) {
        const data: number[] = []

        const dataFunction = priceType === OptionPrice.call ?
            model.callPrice :
            model.putPrice

        for (let index = 0; index < graphLength; index++) {
            data.push(dataFunction.bind(model)(index))
        }

        return data
    }
}