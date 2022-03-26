<template>
<form>
    <div>
        <label for="graphStart">Левая граница разбиения</label>
        <input 
            type="number" 
            name="graphStart" 
            id="graphStart"
            min="0"
            v-model="start"
            @change="sendLimits"
        >
    </div>
    <div>
        <label for="graphEnd">Правая граница разбиения</label>
        <input 
            type="number" 
            name="graphEnd" 
            id="graphEnd"
            min="0"
            v-model="end"
            @change="sendLimits"
        >
    </div>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'OptionGraphLimits',
    emits: ['limits-changed'],
    data() {
        return {
            start: 0,
            end: 250
        }
    },
    methods: {
        sendLimits() {
            const limits = { 
                start: this.start,
                end: this.end,
            }
            this.$emit('limits-changed', limits);
        }
    }
});
</script>
