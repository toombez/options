<script setup lang="ts">
import { FormKitFrameworkContext } from '@formkit/core'
import { defineProps, PropType } from 'vue'
import { computed } from '@vue/reactivity';

import { IOptionParameter, OptionParameters } from '@/assets/types';
import ParametersSettings from '@/assets/JSON/ParametersSettings.json'

interface optionFormContext extends FormKitFrameworkContext {
    parameters: OptionParameters[]
}
const props = defineProps({
    context: {
        type: Object as PropType<optionFormContext>
    }
})

const parameters = computed(() => (
    (ParametersSettings as IOptionParameter[]).filter(parameter => (
        props.context?.parameters.includes(parameter.name as OptionParameters)
    ))
))

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
    :min="parameter.min"
    :max="parameter.max"
/>
</template>
