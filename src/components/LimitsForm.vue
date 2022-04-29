<script setup lang="ts">
import { FormKitFrameworkContext } from '@formkit/core'
import { FormKit } from '@formkit/vue'
import { ref, defineProps, PropType, onBeforeMount } from 'vue'
import { ILimits } from '@/assets/types'

const props = defineProps({
    context: {
        type: Object as PropType<FormKitFrameworkContext>
    }
})

const limits = ref<ILimits>({
    start: 0,
    end: 20
})

onBeforeMount(() => {
    props.context?.node.input(limits.value)
})
</script>

<template>
<FormKit 
    label="start"
    type="number" 
    step="1" 
    min="0" 
    v-model.number="limits.start" 
/>
<FormKit
    label="end"
    type="number" 
    step="1" 
    :min="limits.start" 
    v-model.number="limits.end" 
/>
</template>