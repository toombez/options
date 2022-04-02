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
import { defineEmits, onMounted, ref } from 'vue';
import { LimitsType } from '@/assets/types';

const emit = defineEmits(['limits-changed']);

const limits = ref<LimitsType>({
    start: 0,
    end: 20
});

onMounted(() => {
    sendLimits();
});

function sendLimits() {
    emit('limits-changed', limits);
}
</script>