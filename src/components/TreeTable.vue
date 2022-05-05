<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { ITree } from '@/assets/types'

defineProps({
    tree: {
        type: Object as PropType<ITree>,
        required: true,
    }
})

const nodeHeight = (layerIndex: number) => (100 / Math.pow(2, layerIndex))
</script>

<template>
<div class="tree">
    <div class="tree__name">
        {{ tree.name }}
    </div>
    <div class="tree__table">
        <div
            class="tree__layer"
            v-for="(layer, layerIndex) in tree.data"
            :key="layerIndex"
        >
            <div
                v-for="(nodeValue, nodeIndex) in layer"
                :key="nodeIndex"
                :style="`height: ${nodeHeight(layerIndex)}%`"
                class="tree__node"
            >
                {{ nodeValue }}
            </div>
        </div>
    </div>
</div>
</template>
<style scoped lang="scss">
.tree {
    &__table {
        display: flex;
    }
    &__node {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        padding: 10px;
    }
}
</style>