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
            /** TODO
             *  Separate all input components into local and global
             */
            option: createInput(OptionInput, {
                props: ['parameters']
            }),
            optionType: createInput(OptionType),
            treeFunction: createInput(OptionTreeFunction)
        }
    }))
    .mount('#app')