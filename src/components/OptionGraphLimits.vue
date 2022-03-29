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
            v-model="limits.end"
            @change="sendLimits"
        >
    </div>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { limits } from '@/assets/types';

export default defineComponent({
    name: 'OptionGraphLimits',
    emits: ['limits-changed'],
    props: {
        initialLimits: {
            required: false,
            default: {
                start: 0,
                end: 20
            }
        }
    },
    created() {
        this.limits = this.initialLimits;
    },
    data() {
        return {
            limits: {
                start: 0,
                end: 20
            } as limits
        }
    },
    methods: {
        sendLimits() {
            this.$emit('limits-changed', this.limits);
        }
    },
});
</script>
