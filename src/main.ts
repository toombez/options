import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig, createInput } from '@formkit/vue'

import LimitsForm from '@/components/LimitsForm.vue'

createApp(App)
    .use(plugin, defaultConfig({
        inputs: {
            limits: createInput(LimitsForm)
        }
    }))
    .mount('#app')