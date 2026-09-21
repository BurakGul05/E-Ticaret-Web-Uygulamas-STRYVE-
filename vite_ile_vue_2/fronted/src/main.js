import './assets/main.css'//! main.css dosyamizi import ettik 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue' //! vue modulu icerisinden createApp fonksiyonunu cagirdik Erisilebilir olduk.
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')


