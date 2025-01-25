import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = '' // TODO: Add your Supabase URL
const supabaseKey = '' // TODO: Add your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey)

const app = createApp({
    data() {
        return {
            members: [],
            loading: true
        }
    },
    async created() {
        // Initial data loading will go here
        this.loading = false
    }
})

// Use PrimeVue
app.use(PrimeVue, { ripple: true })

// Register PrimeVue components
app.component('p-card', Card)

// Mount the app
app.mount('#app')