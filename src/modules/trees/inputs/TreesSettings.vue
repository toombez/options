<script setup lang="ts">
import { FormKitFrameworkContext } from '@formkit/core'
import { defineProps, onMounted, PropType, ref } from 'vue'
import { ITreesSettings, treesFunctions } from '../types';
const props = defineProps({
    context: Object as PropType<FormKitFrameworkContext>
})

const settings = ref<ITreesSettings>({
    layersCount: 1,
    function: treesFunctions.func1
})

const selectOption = Object.values(treesFunctions)
onMounted(() => props.context?.node.input(settings))
</script>

<template>
<FormKit
    type="group"
    v-model="settings"
>
    <FormKit
        type="number"
        label="Количество слоев деревьев"
        help="Количество слоев деревьев"
        name="layersCount"
        min="1"
        v-model.number="settings.layersCount"
    />
    <FormKit
        type="select"
        label="Функция для вычисления дерева V"
        help="Функция для вычисления дерева V"
        :options="selectOption"
        name="function"
        v-model="settings.function"
    />
</FormKit>
</template>
