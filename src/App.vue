<template>
<div>
    <FormKit
        type="option" 
        v-model="option"
        :parameters="[
            OptionParameters.r,
            OptionParameters.sigma,
            OptionParameters.T,
        ]"
    />
    <ComparingOptionModelsGraph
        v-if="option"
        :models="models"
    />
</div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { watch } from 'vue';

import ComparingOptionModelsGraph from '@/components/ComparingOptionModelsGraph.vue'

import BlackScholesOptionModel from '@/structures/OptionModels/BlackScholesOptionModel';
import CoxRossRubinsteinOptionModel from '@/structures/OptionModels/CoxRossRubinsteinOptionModel';

import { IOptionForModel, OptionParameters } from '@/assets/types'

const option = ref()

watch(option, () => {
    for (let model of models.value.values()) {
        model.Option = option.value
    }
})

const models = ref([
    new BlackScholesOptionModel(option.value as IOptionForModel),
    new CoxRossRubinsteinOptionModel(option.value as IOptionForModel)
])
</script>
