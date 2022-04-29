import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig, createInput } from '@formkit/vue'

import LimitsForm from '@/inputs/LimitsForm.vue'
import OptionForm from '@/inputs/OptionForm.vue'
import OptionPrice from '@/inputs/OptionPrice.vue'

createApp(App)
    .use(plugin, defaultConfig({
        inputs: {
            limits: createInput(LimitsForm),
            option: createInput(OptionForm, {
                props: ['parameters']
            }),
            price: createInput(OptionPrice)
        }
    }))
    .mount('#app')