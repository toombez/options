import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig, createInput } from '@formkit/vue'

import OptionForm from '@/components/OptionForm.vue'

createApp(App)
    .use(plugin, defaultConfig({
        inputs: {
            option: createInput(OptionForm, {
                props: ['parameters']
            })
        }
    }))
    .mount('#app')