<template>
  <div class="login-container">
    <Card class="login-card">
      <template #title>
        <h2>Login to Yoseikan Budo Club</h2>
      </template>
      <template #content>
        <form @submit.prevent="handleEmailLogin">
          <div class="field">
            <label for="email">Email</label>
            <InputText 
              id="email" 
              v-model="email" 
              type="email" 
              class="w-full"
              :class="{ 'p-invalid': v$.email.$invalid && v$.email.$dirty }"
            />
            <small class="p-error" v-if="v$.email.$error">
              {{ v$.email.$errors[0].$message }}
            </small>
          </div>
          
          <div class="field">
            <label for="password">Password</label>
            <Password 
              id="password" 
              v-model="password" 
              :feedback="false"
              toggleMask 
              class="w-full"
              :class="{ 'p-invalid': v$.password.$invalid && v$.password.$dirty }"
            />
            <small class="p-error" v-if="v$.password.$error">
              {{ v$.password.$errors[0].$message }}
            </small>
          </div>

          <div class="field">
            <Button 
              type="submit" 
              label="Login" 
              class="w-full"
              :loading="loading"
            />
          </div>
        </form>

        <Divider align="center">
          <span>or continue with</span>
        </Divider>

        <div class="social-login">
          <Button 
            @click="handleGoogleLogin"
            icon="pi pi-google"
            class="google-btn p-button-secondary"
            :loading="googleLoading"
          >
            Google
          </Button>
          <Button 
            @click="handleGithubLogin"
            icon="pi pi-github"
            class="github-btn p-button-secondary"
            :loading="githubLoading"
          >
            GitHub
          </Button>
        </div>

        <div class="mt-3 text-center">
          <router-link to="/signup">Don't have an account? Sign up</router-link>
        </div>
      </template>
    </Card>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)
const googleLoading = ref(false)
const githubLoading = ref(false)

const rules = {
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, { email, password })

const handleEmailLogin = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    router.push('/dashboard')
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  googleLoading.value = true
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) throw error
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    })
  } finally {
    googleLoading.value = false
  }
}

const handleGithubLogin = async () => {
  githubLoading.value = true
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) throw error
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    })
  } finally {
    githubLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: var(--surface-ground);
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.field {
  margin-bottom: 1.5rem;
}

.social-login {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.google-btn,
.github-btn {
  flex: 1;
}
</style> 