<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import BinaryOptionTree from '../BinaryOptionTree';

defineProps({
    tree: {
        type: Object as PropType<BinaryOptionTree<unknown>>,
        required: true
    }
})

const nodeHeight = (layerIndex: number) => (100 / Math.pow(2, layerIndex))
</script>
<template>
<div class="tree">
    <div
        class="tree__layer"
        v-for="(layer, layerIndex) in tree.layered"
        :key="layerIndex"
    >
        <div
            class="tree__node"
            v-for="(node, nodeIndex) in layer"
            :key="nodeIndex"
            :style="`height: ${nodeHeight(layerIndex)}%`"
        >
            <component :is="tree.dataComponent" :data="node.data" />
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
