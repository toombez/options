<script setup lang="ts">
import { FormKitFrameworkContext } from '@formkit/core'
import { ref } from '@vue/reactivity'
import { IModelComparingGraphSettings, OptionPrice, Models } from '@/modules/models/types'
import { onMounted, defineProps, PropType } from 'vue';

const props = defineProps({
    context: Object as PropType<FormKitFrameworkContext>
})

const settings = ref<IModelComparingGraphSettings>({
    limits: {
        end: 20,
        start: 0
    },
    price: [],
    models: []
})

onMounted(() => props.context?.node.input(settings))
</script>

<template>
<div>
    <FormKit type="group" v-model="settings">
        <FormKit type="group" name="limits" label="Границы графика">
            <FormKit
                type="number"
                name="start"
                label="Начало графика"
                min="0"
                step="1"
                :max="settings.limits.end"
                v-model.number="settings.limits.start"
            />
            <FormKit
                type="number"
                name="end"
                step="1"
                label="Конец графика"
                :min="settings.limits.start"
                v-model.number="settings.limits.end"
            />
        </FormKit>
        <FormKit
            type="checkbox"
            name="price"
            label="Типы опциона, которые необходимо отобразить"
            :options="[
                OptionPrice.call,
                OptionPrice.put
            ]"
            v-model="settings.price">
        </FormKit>
        <FormKit 
            type="checkbox"
            name="models"
            label="Модели, которые необходимо отобразить"
            :options="Object.values(Models)"
            v-model="settings.models"
        />
    </FormKit>
    <hr>
</div>
</template>