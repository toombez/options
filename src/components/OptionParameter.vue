<template>
<div>
    <label :for="parameter?.ID">
        {{ parameter?.description }} ({{ parameter?.displayedName }})
    </label>
    <input
        :type="parameter?.Type"
        :min="parameter?.min"
        :max="parameter?.max"
        :step="parameter?.step"
        :id="parameter?.ID"
        v-model="parameter!.value"
    >
</div>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import OptionParameter from '@/structures/OptionParameter';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
    parameter: Object as PropType<OptionParameter<number | string>>
});
</script>