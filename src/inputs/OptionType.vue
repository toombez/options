<script setup lang="ts">
import { OptionType } from '@/assets/types'
import { defineProps, PropType, onMounted } from 'vue'
import { ref } from '@vue/reactivity'

import { FormKitFrameworkContext } from '@formkit/core'

const props = defineProps({
    context: Object as PropType<FormKitFrameworkContext>
})

const optionType = ref(OptionType.european)
onMounted(() => {
    props.context?.node.input(optionType)
})
</script>
<template>
<FormKit
    type="radio"
    :options="[
        OptionType.european,
        OptionType.american,
    ]"
    v-model="optionType"
>
</FormKit>
</template>