<script setup lang="ts">
import { defineProps, PropType, computed, ref, onBeforeMount, watch } from 'vue'
import { FormKitFrameworkContext } from '@formkit/core'

import { IOption } from '@/assets/types';
import OptionParameters from '@/assets/RegistredOptionParameters'
import OptionParameter from '@/structures/OptionParameter'

interface IOptionInputContext extends FormKitFrameworkContext {
    parameters: OptionParameters[]
}
const props = defineProps({
    context: {
        type: Object as PropType<IOptionInputContext>,
        required: true,
    }
})

const defaultParameters = [
    OptionParameters.S,
    OptionParameters.K,
    OptionParameters.r,
]
const parameters = computed(() => {
    const tempParameters: OptionParameters[] = [...defaultParameters]
    props.context.parameters?.forEach(parameter => {
        tempParameters.push(parameter)
    })

    const unicleParameters = tempParameters.filter((value, index, self) => (
        self.indexOf(value) === index
    ))

    const parameters = unicleParameters.map((parameterName) => (
        OptionParameter.registred.get(parameterName)
    ))
    return parameters as OptionParameter<unknown>[]
})

type IRawOption = {
    [key in OptionParameters]?: string;
}

const rawOption = ref<IRawOption>({})
const option = ref<IOption>({})

onBeforeMount(() => {
    watch(rawOption.value, () => {
        parameters.value.forEach(parameter => {
            const rawValue = rawOption.value[parameter.name] as string

            /** Idk how to fix it
             *  Have only one idea how to convert raw value without lost flexibility
             */
            option.value[parameter.name] = parameter?.fromRaw(rawValue)
        })
    })

    for (const parameter of parameters.value) {
        rawOption.value[parameter.name] = parameter.defaultRawValue
    }
    props.context.node.input(option.value)
})
</script>
<template>
<div
    v-for="parameter in parameters"
    :key="parameter.name"
>
    <FormKit
        :label="parameter.label"
        :name="parameter.name"
        :help="parameter.description"

        :type="parameter.type"
        :min="parameter.Min"
        :max="parameter.Max"
        :step="parameter.step"

        v-model="rawOption![parameter.name]"
    />
</div>
</template>