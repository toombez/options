import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig, createInput } from '@formkit/vue'

import LimitsForm from '@/components/LimitsForm.vue'
import OptionForm from '@/components/OptionForm.vue'

createApp(App)
    .use(plugin, defaultConfig({
        inputs: {
            limits: createInput(LimitsForm),
            option: createInput(OptionForm, {
                props: ['parameters']
            })
        }
    }))
    .mount('#app')