<template>
<OptionCreatorForm
    v-model="option"
/>

<LineChart
    v-if="option && limits"
    :chartData="graphData" 
/>

<FormKit type="limits" v-model="limits" />
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import BlackScholesOptionModel from '@/structures/OptionModels/BlackScholesOptionModel';
import CoxRossRubinsteinOptionModel from '@/structures/OptionModels/CoxRossRubinsteinOptionModel';
// Vue imports section
import { defineProps, PropType, watch } from 'vue';

// Charts imports section
import { LineChart } from 'vue-chart-3';
import { Chart, ChartData, registerables } from 'chart.js';

import GraphLimits from '@/components/GraphLimits.vue';
import OptionCreatorForm from '@/components/OptionCreatorForm.vue';
import { computed, ref } from '@vue/reactivity';
import { ILimits } from '@/assets/types';
import Option from '@/structures/Option';
import OptionModel from '@/structures/OptionModels/OptionModel';

Chart.register(...registerables);

const props = defineProps({
    models: Object as PropType<
        (typeof CoxRossRubinsteinOptionModel | 
        typeof BlackScholesOptionModel)[]
    >
});

let limits = ref<ILimits>();
let option = ref<Option>();

let models: (OptionModel)[] = [];

watch(option, (newOption) => {
    models = [];
    props.models?.map(Model => models.push(new Model(newOption!)));
});

let graphData = computed((): ChartData => {
    const labels: number[] = [];
    
    for (let i = limits.value!.start; i < limits.value!.end + 1; i++) {
        labels.push(i);
    }
    const datasets = models.map(model => {
        const modelData = model.generateGraphData(limits.value!.end + 1);

        return [{
            label: modelData.label + ' call',
            data: modelData.call.splice(limits.value!.start, limits.value!.end + 1),
            borderColor: modelData.lineColor,
            pointStyle: modelData.pointStyle,
        },
        {
            label: modelData.label + ' put',
            data: modelData.put.splice(limits.value!.start, limits.value!.end + 1),
            borderColor: modelData.lineColor,
            pointStyle: modelData.pointStyle,
        }]
    })
        .flat();

    return {
        labels,
        datasets,
    }
})
</script>