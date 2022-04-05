<template>
<div>
    <ComparingOptionModelsGraph
        :models="[
            BlackScholesOptionModel,
            CoxRossRubinsteinOptionModel,
        ]"
    />
</div>
</template>

<script lang="ts" setup>
import ComparingOptionModelsGraph from '@/components/ComparingOptionModelsGraph.vue';
import BlackScholesOptionModel from '@/structures/OptionModels/BlackScholesOptionModel';
import CoxRossRubinsteinOptionModel from '@/structures/OptionModels/CoxRossRubinsteinOptionModel';
</script>
