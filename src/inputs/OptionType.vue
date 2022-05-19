<script setup lang="ts">
import { defineProps, PropType, watch } from 'vue'
import { ref } from '@vue/reactivity'
import { FormKitFrameworkContext } from '@formkit/core'

import { OptionType } from '@/assets/types'
import OptionParameter from '@/structures/OptionParameter'
import OptionParameters from '@/assets/RegistredOptionParameters'

const props = defineProps({
    context: Object as PropType<FormKitFrameworkContext>
})

const inputOptions = Object.values(OptionType)
const currentOptionType = ref(
    OptionParameter.registred.get(OptionParameters.type)?.defaultValue
)

watch(currentOptionType, () => {
    props.context?.node.input(currentOptionType)
})
</script>
<template>
<FormKit
    type="radio"
    :options="inputOptions"
    v-model="currentOptionType"
/>
</template>