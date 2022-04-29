<template>
<form>
    <div>
        <label for="graphStart">Левая граница разбиения</label>
        <input 
            type="number" 
            name="graphStart" 
            id="graphStart"
            min="0"
            v-model="limits.start"
            :max="limits.end"
            @change="sendLimits"
        >
    </div>
    <div>
        <label for="graphEnd">Правая граница разбиения</label>
        <input 
            type="number" 
            name="graphEnd" 
            id="graphEnd"
            v-model="limits.end"
            :min="limits.start"
            @change="sendLimits"
        >
    </div>
</form>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits, onMounted, ref } from 'vue';
import { LimitsType } from '@/assets/types';

defineProps({
    modelValue: Object as PropType<LimitsType>
});

const emit = defineEmits(['update:modelValue']);

const limits = ref<LimitsType>({
    start: 0,
    end: 20
});

onMounted(() => {
    sendLimits();
});

function sendLimits() {
    emit('update:modelValue', limits.value);
}
</script>