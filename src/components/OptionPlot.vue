<template>
<LineChart 
    :chartData="data"
/>
<OptionPlotLimits 
    @limits-changed="setLimits"
/>
</template>

<script>
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

import OptionPlotLimits from '@/components/OptionPlotLimits.vue';

import Option from '@/structures/Option';
import OptionCalcutalor from '@/structures/OptionCalculator';

Chart.register(...registerables);

export default defineComponent({
    name: 'OptionPlot',
    components: { 
        LineChart,
        OptionPlotLimits
    },
    props: {
        option: Option,
    },
    data() {
        return {
            calculator: new OptionCalcutalor(this.option),

            BlackScholesColor: '#ed1c5b',
            CoxRossRubinsteinColor: '#f0a754',

            limits: {
                start: 0,
                end: 250,
            }
        }
    },
    methods: {
        setLimits(limits) {
            this.limits = limits;
        }
    },
    computed: {
        data() {
            const labels = [];
            const BlackScholesData = [];
            const CoxRossRubinsteinData = [];

            const BlackScholesSolution = this.calculator.BlackScholes();

            for (let i = this.limits.start; i < this.limits.end + 1; i++) {
                labels.push(i);
                BlackScholesData.push(BlackScholesSolution);
                CoxRossRubinsteinData.push(this.calculator.CoxRossRubinstein(i));
            }

            return {
                labels: labels,
                datasets: [
                    {
                        label: 'Модель Блэка-Шоулза',
                        data: BlackScholesData,
                        borderColor: this.BlackScholesColor,
                        pointStyle: 'line',
                    },
                    {
                        label: 'Модель Кокса–Росса–Рубинштейна',
                        data: CoxRossRubinsteinData,
                        borderColor: this.CoxRossRubinsteinColor,
                        pointStyle: 'rectRot',
                    }
                ],
            }
        }
    }
});
</script>