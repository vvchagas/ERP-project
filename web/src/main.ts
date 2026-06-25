import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '/style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import router from './router'

library.add(faInstagram, faTiktok)

import App from './views/AppView.vue'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
