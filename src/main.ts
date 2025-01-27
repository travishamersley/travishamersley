import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Calendar from 'primevue/calendar'

import App from './App.vue'
import Login from './components/Login.vue'
import LandingPage from './components/LandingPage.vue'
import Signup from './components/Signup.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    // Add more routes as needed
  ]
})

// Create app
const app = createApp(App)

// Use plugins
app.use(PrimeVue)
app.use(router)
app.use(ToastService)

// Register PrimeVue components
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Card', Card)
app.component('Divider', Divider)
app.component('Toast', Toast)
app.component('Calendar', Calendar)

app.mount('#app') 