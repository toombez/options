<script setup lang="ts">
import { defineProps, PropType, watch } from 'vue'
import { computed, ref } from '@vue/reactivity'

import { createInput } from '@formkit/vue'
import SettingsInput from '@/modules/models/inputs/ModelComparingGraphSettingsInput.vue'

import OptionModel from '@/modules/models/Model'
import BlackScholesModel from '@/modules/models/OptionModels/BlackScholesModel'
import CoxRossRubinsteinModel from '@/modules/models/OptionModels/CoxRossRubinsteinModel'

import Utils from '@/modules/models/Utils'
import { IOptionForModel, Models, IModelComparingGraphSettings } from '@/modules/models/types'
import { OptionPrice } from '@/assets/types'

import { Line } from 'vue-chartjs'
import { Chart, ChartData, ChartDataset, PointStyle, registerables } from 'chart.js'

Chart.register(...registerables)
const settingsInput = createInput(SettingsInput)

const props = defineProps({
    option: {
        type: Object as PropType<IOptionForModel>,
        required: true
    }
})

const PricePointStyles = new Map<OptionPrice, PointStyle>()
PricePointStyles.set(OptionPrice.call, 'circle')
PricePointStyles.set(OptionPrice.put, 'rectRot')

const models = ref<Map<Models, OptionModel>>(new Map())
setOptionToModels()

watch(props, () => {
    setOptionToModels()
})

const chartData = computed<ChartData<'line'>>(() => {
    const datasets: ChartDataset<'line'>[] = []

    settings.value.models.forEach(modelName => {
        const model = models.value.get(modelName) as OptionModel
        settings.value.price.forEach(price => {
            datasets.push(Utils.ModelGraphData(
                model,
                price,
                settings.value.limits,
                {
                    lineColor: model.MODEL_COLOR,
                    pointStyle: PricePointStyles.get(price)
                }
            ))
        })
    })

    return {
        labels: labels.value,
        datasets: datasets
    }
})

const labels = computed(() => {
    const start = settings.value.limits.start
    const end = settings.value.limits.end
    const labels = []
    for (let i = start; i < end; i++) {
        labels.push(i)
    }
    return labels
})

const settings = ref<IModelComparingGraphSettings>({
    limits: {
        end: 20,
        start: 0
    },
    price: [],
    models: []
})

function setOptionToModels() {
    models.value.set(Models.BlackScholes, new BlackScholesModel(props.option))
    models.value.set(Models.CoxRossRubinstein, new CoxRossRubinsteinModel(props.option))
}
</script>
<template>
<div>
    <FormKit 
        :type="settingsInput"
        v-model="settings"
    />
    <Line
        :chart-data="chartData"
    />
</div>
</template>