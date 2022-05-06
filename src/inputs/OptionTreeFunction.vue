<script setup lang="ts">
import { treeFunctions } from '@/assets/types'
import { defineProps, onMounted, PropType } from 'vue'
import { computed, ref } from '@vue/reactivity'
import { FormKitFrameworkContext } from '@formkit/core';

const props = defineProps({
    context: Object as PropType<FormKitFrameworkContext>
})

const currentFunction = ref(0)

const options = computed(() => {
    const functions = []
    for (let i = 0; i < 4; i++) {
        functions.push({
            label: treeFunctions[i],
            value: i
        })
    }
    return functions
})

onMounted(() => {
    props.context?.node.input(currentFunction)
})
</script>
<template>
<FormKit 
    type="select" 
    :options="options"
    v-model="currentFunction"
></FormKit>
</template>