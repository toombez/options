<script setup lang="ts">
import { IOptionForTree } from '@/assets/types';
import { createInput } from '@formkit/vue';
import { defineProps, onMounted, PropType, ref, shallowRef, triggerRef, watch } from 'vue'
import STree from '../OptionTree/STree';
import VTree from '../OptionTree/VTree';
import BetaTree from '../OptionTree/BetaTree';
import GammaTree from '../OptionTree/GammaTree';

import OptionTree from './OptionTree.vue';
import BinaryOptionTree from '../BinaryOptionTree';

import SettingsInput from '@/modules/trees/inputs/TreesSettings.vue';
import { ITreesSettings, treesFunctions } from '../types';

const settingsInput = createInput(SettingsInput)

const props = defineProps({
    option: {
        type: Object as PropType<IOptionForTree>,
        required: true
    }
})

const settings = ref<ITreesSettings>({
    function: treesFunctions.func1,
    layersCount: 3
})

const stree = shallowRef<STree>(new STree())
const vtree = shallowRef<VTree>(new VTree())
const gammaTree = shallowRef<GammaTree>(new GammaTree())
const betaTree = shallowRef<BetaTree>(new BetaTree())

generateTrees()

onMounted(() => {
    watch([props, settings], () => {
        generateTrees()
    })
})

function generateTrees() {
    stree.value.generate({
        layersCount: settings.value.layersCount,
        option: props.option
    })

    vtree.value.generate({
        option: props.option,
        sTree: stree.value as STree,
        settings: settings.value
    })

    gammaTree.value.generate({
        option: props.option,
        sTree: stree.value,
        vTree: vtree.value
    })

    betaTree.value.generate({
        option: props.option,
        sTree: stree.value,
        vTree: vtree.value,
        gammaTree: gammaTree.value
    })

    triggerRef(stree)
    triggerRef(vtree)
    triggerRef(gammaTree)
    triggerRef(betaTree)
}

</script>
<template>
<div>
    <h1>
        S дерево
    </h1>
    <OptionTree v-if="stree" :tree="(stree.layered)" :dataComponent="stree.dataComponent" />
    <h1>
        v дерево
    </h1>
    <OptionTree v-if="vtree" :tree="(vtree.layered)" :dataComponent="vtree.dataComponent" :numberLength="3" />
    <h1>
        gamma дерево
    </h1>
    <OptionTree v-if="gammaTree" :tree="(gammaTree.layered)" :dataComponent="gammaTree.dataComponent" :numberLength="3" />
    <h1>
        beta дерево
    </h1>
    <OptionTree v-if="betaTree" :tree="(betaTree.layered)" :dataComponent="betaTree.dataComponent" :numberLength="3" />

    <FormKit :type="settingsInput" v-model="settings" />
    
</div>
</template>
