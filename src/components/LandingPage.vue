<template>
  <div class="landing-page">
    <header class="header">
      <div class="header-content">
        <div class="header-top">
          <Button 
            label="Login" 
            @click="navigateToLogin" 
            class="p-button-text p-button-lg"
            style="color: white;"
          />
        </div>
        <h1>Welcome to Yoseikan Budo Club</h1>
        <p class="subtitle">Join our community of martial artists</p>
        <Button label="Sign Up Now" @click="navigateToSignup" class="p-button-lg" />
      </div>
    </header>

    <div class="content-section">
      <div class="features">
        <h2>Member Benefits</h2>
        <div class="feature-grid">
          <Card class="feature-card">
            <template #header>
              <i class="pi pi-calendar" style="font-size: 2rem"></i>
            </template>
            <template #title>Class Attendance</template>
            <template #content>
              Track your training progress and attendance history
            </template>
          </Card>

          <Card class="feature-card">
            <template #header>
              <i class="pi pi-dollar" style="font-size: 2rem"></i>
            </template>
            <template #title>Dues Management</template>
            <template #content>
              Easy payment tracking and history viewing
            </template>
          </Card>

          <Card class="feature-card">
            <template #header>
              <i class="pi pi-shopping-cart" style="font-size: 2rem"></i>
            </template>
            <template #title>Club Store</template>
            <template #content>
              Purchase training equipment and club merchandise
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToSignup = () => {
  router.push('/signup')
}

const navigateToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}

.header {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/src/assets/dojo-background.jpg') center/cover;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.header-content {
  padding: 2rem;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.content-section {
  padding: 4rem 2rem;
}

.features {
  max-width: 1200px;
  margin: 0 auto;
}

.features h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
}

.feature-card ::v-deep(.p-card-header) {
  padding-top: 1.5rem;
}

.header-top {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style> 