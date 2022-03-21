<template>
<form>
    <div>
        <label for="plotStart">Левая граница разбиения</label>
        <input 
            type="number" 
            name="plotStart" 
            id="plotStart"
            min="0"
            v-model="start"
            @change="sendLimits"
        >
    </div>
    <div>
        <label for="plotEnd">Правая граница разбиения</label>
        <input 
            type="number" 
            name="plotEnd" 
            id="plotEnd"
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
    name: 'OptionPlotLimits',
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
