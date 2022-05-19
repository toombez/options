import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig, createInput } from '@formkit/vue'

import LimitsForm from '@/inputs/LimitsForm.vue'
import OptionInput from '@/inputs/OptionInput.vue'
import OptionPrice from '@/inputs/OptionPrice.vue'
import OptionType from '@/inputs/OptionType.vue'
import OptionTreeFunction from '@/inputs/OptionTreeFunction.vue'

createApp(App)
    .use(plugin, defaultConfig({
        inputs: {
            limits: createInput(LimitsForm),
            option: createInput(OptionInput, {
                props: ['parameters']
            }),
            price: createInput(OptionPrice),
            optionType: createInput(OptionType),
            treeFunction: createInput(OptionTreeFunction)
        }
    }))
    .mount('#app')