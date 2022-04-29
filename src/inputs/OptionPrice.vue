<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import { FormKitFrameworkContext } from '@formkit/core'
import { OptionPrice } from '@/assets/types'
import { ref, defineProps, PropType, onMounted } from 'vue';

const props = defineProps({
    context: Object as PropType<FormKitFrameworkContext>
})

const price = ref()

onMounted(() => {
    props.context?.node.input(price)
})
</script>

<template>
<FormKit 
    type="checkbox"
    :options="[
        OptionPrice.call,
        OptionPrice.put
    ]"
    v-model="price"
/>
</template>