<script setup lang="ts">
import { FormKitFrameworkContext } from '@formkit/core'
import { defineProps, PropType } from 'vue'

import { OptionParameters } from '@/assets/types';

interface optionFormContext extends FormKitFrameworkContext {
    parameters: OptionParameters[]
}
const props = defineProps({
    context: {
        type: Object as PropType<optionFormContext>
    }
})

</script>

<template>
<form>
</form>
</template>
