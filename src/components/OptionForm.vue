<script setup lang="ts">
import { FormKitFrameworkContext } from '@formkit/core'
import { defineProps, onBeforeMount, PropType, watch } from 'vue'
import { computed, ref } from '@vue/reactivity';

import { DateOptionParameters, IOption, IOptionParameter, NumberOptionParameters, OptionParameters, ParameterTypes } from '@/assets/types';
import ParametersSettings from '@/assets/JSON/ParametersSettings.json'

interface optionFormContext extends FormKitFrameworkContext {
    parameters?: OptionParameters[]
}
const props = defineProps({
    context: {
        type: Object as PropType<optionFormContext>
    }
})

interface IRawOption {
    S: string;
    K: string;

    r?: string;
    sigma?: string;
    T?: string;

    u?: string;
    d?: string;
}

const parameters = computed(() => {
    const tempParameters: OptionParameters[] = [OptionParameters.S, OptionParameters.K]

    if (props.context?.parameters) {
        props.context?.parameters.forEach(parameter => {
            if (tempParameters.includes(parameter)) return
            tempParameters.push(parameter)
        })
    }
    
    const resultParameters = (ParametersSettings as IOptionParameter[])
        .filter(parameter => 
            tempParameters.includes(parameter.name as OptionParameters)
        )

    return resultParameters
})

const rawOption = ref<Partial<IRawOption>>({})

onBeforeMount(() => {
    generateRaw()
})


const option = computed<Partial<IOption>>(() => {
    const resultOption: Partial<IOption> = {}
    for (let parameter of parameters.value) {
        if (parameter.type === ParameterTypes.date) {
            const dateKey = parameter.name as DateOptionParameters
            resultOption[dateKey] = new Date(rawOption.value[dateKey] as string)
        } else {
            const numberKey = parameter.name as NumberOptionParameters
            resultOption[numberKey] = Number(rawOption.value[numberKey])
        }
    }
    return resultOption
})

watch(rawOption.value, () => {
    props.context?.node.input(option)
})

function generateRaw() {
    for (let parameter of parameters.value) {
        const value = (parameter.type === ParameterTypes.date) ?
            formattedDate(dateAfterDays(parameter.default)) :
            parameter.default.toString()

        rawOption.value[parameter.name as OptionParameters] = value
    }
}
function parameterMin(parameter: IOptionParameter) {
    const value =  parameter.type === ParameterTypes.date ?
        formattedDate(dateAfterDays(parameter.min || 0)) :
        parameter.min
    
    return value
}
function dateAfterDays(day: number) {
    const now = new Date()
    
    const targetDate = new Date(
        now.getFullYear(), 
        now.getMonth(), 
        now.getDate() + day
    )
    return targetDate
}
function formattedDate(date: Date) {
    const formatter = Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    const formattedDate = formatter.format(date).split('.').reverse().join('-')
    return formattedDate
}
</script>

<template>
<FormKit
    v-for="parameter in parameters"
    :key="parameter.name"

    :type="parameter.type"
    :label="parameter.label"
    :name="parameter.name"
    :help="parameter.description"

    :step="parameter.step"
    :min="parameterMin(parameter)"
    :max="parameter.max"

    v-model="rawOption[parameter.name as OptionParameters]"
/>
</template>
