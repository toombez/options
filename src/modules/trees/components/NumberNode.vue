<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
    data: {
        type: Number,
        required: true
    },
    numberLength: {
        type: Number,
        default: 3
    }
})
</script>

<template>
<div>
    {{ data?.toFixed(numberLength) }}
</div>
</template>