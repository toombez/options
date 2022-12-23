<template>
<div>
    <FormKit
        type="option" 
        v-model="option"
        :parameters="Object.values(OptionParameters)"
    />
</div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { OptionParameters } from '@/assets/RegistredOptionParameters'
import { IOption } from './assets/types';

const option = ref<IOption>()
</script>
