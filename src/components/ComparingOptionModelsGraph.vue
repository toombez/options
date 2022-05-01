<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { computed, ref } from '@vue/reactivity'

import { Line } from 'vue-chartjs'
import { Chart, ChartData, registerables } from 'chart.js'

import OptionCalculator from '@/structures/OptionCalculator'
import { ILimits, IOptionModel, OptionPrice } from '@/assets/types';

Chart.register(...registerables)

const props = defineProps({
    models: {
        type: Array as PropType<IOptionModel[]>,
        required: true
    }
})

const priceType = ref<OptionPrice[]>([])
const limits = ref<ILimits>()

const graphData = computed<ChartData<'line'>>(() => ({
        datasets: datasets.value,
        labels: labels.value
}))

const datasets = computed(() => {
    const rawdatasets = OptionCalculator.graphDataForComparing(
        props.models,
        priceType.value,
        end.value
    )

    const result = rawdatasets.map(dataset => ({
        label: `${dataset.modelName} ${dataset.priceType}`,
        data: dataset.data.splice(start.value, end.value)
    }))

    return result
})

const labels = computed<number[]>(() => {
    const labels: number[] = []
    for (let i = start.value; i < end.value; i++) {
        labels.push(i)
    }

    return labels
})

const start = computed<number>(() => limits.value?.start || 0)
const end = computed<number>(() => limits.value?.end || 20)

const isNotEmptyPriceType = computed<boolean>(() => {
    return priceType.value.length > 0
})
</script>
<template>
<div>
    <FormKit type="price" v-model="priceType" />
    <FormKit type="limits" v-model="limits" />
    <Line 
        v-if="isNotEmptyPriceType"
        :chart-data="graphData"
    />
</div>
</template>