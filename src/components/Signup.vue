<template>
  <div class="signup-container">
    <Card class="signup-card">
      <template #title>
        <h2>Sign Up for Membership</h2>
      </template>
      <template #content>
        <form @submit.prevent="handleSignup">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="firstName">First Name*</label>
              <InputText 
                id="firstName" 
                v-model="form.firstName" 
                :class="{ 'p-invalid': v$.firstName.$invalid && v$.firstName.$dirty }"
              />
              <small class="p-error" v-if="v$.firstName.$error">
                {{ v$.firstName.$errors[0].$message }}
              </small>
            </div>

            <div class="field col-12 md:col-6">
              <label for="lastName">Last Name*</label>
              <InputText 
                id="lastName" 
                v-model="form.lastName"
                :class="{ 'p-invalid': v$.lastName.$invalid && v$.lastName.$dirty }"
              />
              <small class="p-error" v-if="v$.lastName.$error">
                {{ v$.lastName.$errors[0].$message }}
              </small>
            </div>

            <div class="field col-12">
              <label for="email">Email*</label>
              <InputText 
                id="email" 
                type="email" 
                v-model="form.email"
                :class="{ 'p-invalid': v$.email.$invalid && v$.email.$dirty }"
              />
              <small class="p-error" v-if="v$.email.$error">
                {{ v$.email.$errors[0].$message }}
              </small>
            </div>

            <div class="field col-12">
              <label for="password">Password*</label>
              <Password 
                id="password" 
                v-model="form.password"
                :class="{ 'p-invalid': v$.password.$invalid && v$.password.$dirty }"
              />
              <small class="p-error" v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
              </small>
            </div>

            <div class="field col-12 md:col-6">
              <label for="dob">Date of Birth*</label>
              <Calendar 
                id="dob" 
                v-model="form.dob" 
                :showIcon="true"
                :class="{ 'p-invalid': v$.dob.$invalid && v$.dob.$dirty }"
              />
              <small class="p-error" v-if="v$.dob.$error">
                {{ v$.dob.$errors[0].$message }}
              </small>
            </div>

            <div class="field col-12 md:col-6">
              <label for="phone">Primary Phone*</label>
              <InputText 
                id="phone" 
                v-model="form.primaryPhone"
                :class="{ 'p-invalid': v$.primaryPhone.$invalid && v$.primaryPhone.$dirty }"
              />
              <small class="p-error" v-if="v$.primaryPhone.$error">
                {{ v$.primaryPhone.$errors[0].$message }}
              </small>
            </div>

            <div class="field col-12">
              <label for="address">Address*</label>
              <InputText 
                id="address" 
                v-model="form.addressLine1"
                :class="{ 'p-invalid': v$.addressLine1.$invalid && v$.addressLine1.$dirty }"
              />
              <small class="p-error" v-if="v$.addressLine1.$error">
                {{ v$.addressLine1.$errors[0].$message }}
              </small>
            </div>

            <div class="field col-12">
              <label for="suburb">Suburb*</label>
              <InputText 
                id="suburb" 
                v-model="form.addressSuburb"
                :class="{ 'p-invalid': v$.addressSuburb.$invalid && v$.addressSuburb.$dirty }"
              />
              <small class="p-error" v-if="v$.addressSuburb.$error">
                {{ v$.addressSuburb.$errors[0].$message }}
              </small>
            </div>
          </div>

          <Button 
            type="submit" 
            label="Sign Up" 
            class="w-full mt-4"
            :loading="loading"
          />
        </form>

        <div class="mt-3 text-center">
          <router-link to="/login">Already have an account? Login</router-link>
        </div>
      </template>
    </Card>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()
const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dob: null as Date | null,
  primaryPhone: '',
  addressLine1: '',
  addressSuburb: ''
})

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  password: { required, minLength: minLength(8) },
  dob: { required },
  primaryPhone: { required },
  addressLine1: { required },
  addressSuburb: { required }
}

const v$ = useVuelidate(rules, form)

const handleSignup = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  loading.value = true
  try {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })

    if (authError) throw authError
    if (!authData.user?.id) throw new Error('No user ID returned')

    console.log('Auth user created:', authData.user.id) // Debug log

    // Then create the member profile
    const { error: profileError } = await supabase
      .from('Member')
      .insert({        
        first_name: form.firstName,
        last_name: form.lastName,
        dob: form.dob,
        primary_phone: form.primaryPhone,
        email: form.email,
        address_line1: form.addressLine1,
        address_suburb: form.addressSuburb
      })

    if (profileError) {
      console.error('Profile creation error:', profileError) // Debug log
      throw profileError
    }

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Account created successfully! Please check your email to verify your account.',
      life: 5000
    })

    router.push('/login')
  } catch (error: any) {
    console.error('Signup error:', error) // Debug log
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
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--surface-ground);
}

.signup-card {
  width: 100%;
  max-width: 800px;
}

.field {
  margin-bottom: 1.5rem;
}
</style> 