<script setup lang="ts">
import { Component, defineProps, PropType, watch } from 'vue'
import { layeredTree } from '../types';

defineProps({
    tree: {
        type: Object as PropType<layeredTree<unknown>>,
        required: true
    },
    dataComponent: {
        type: Object as PropType<Component>
    }
})

const nodeHeight = (layerIndex: number) => (100 / Math.pow(2, layerIndex))
</script>
<template>
<div class="tree">
    <div
        class="tree__layer"
        v-for="(layer, layerIndex) in tree"
        :key="layerIndex"
    >
        <div
            class="tree__node"
            v-for="(node, nodeIndex) in layer"
            :key="nodeIndex"
            :style="`height: ${nodeHeight(layerIndex)}%`"
        >
            <component :is="dataComponent" :data="node.data" />
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.tree {
    display: flex;

    &__node {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        padding: 10px;
    }
}
</style>
