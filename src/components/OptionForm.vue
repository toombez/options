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
