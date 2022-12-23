<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { VTreeData } from '@/modules/trees/OptionTree/VTree'

defineProps({
    data: {
        type: Object as PropType<VTreeData>,
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
    <div>
        {{ data.value.toFixed(numberLength) }}
    </div>
    <div
        v-if="data.optimal !== null"
    >
        ({{ data.optimal.toFixed(numberLength) }})
    </div>
</div>
</template>