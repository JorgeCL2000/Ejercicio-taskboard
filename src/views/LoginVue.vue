<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

//variables

const email = ref('')
const password = ref('')
const router = useRouter()
const noLogin = ref('')
const login = async () => {
  try {
    const datos = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = datos.user

    if (!user.emailVerified) {
      noLogin.value = 'Debe verificarse para poder entrar'
      return
    }
    router.push('/tareas')
  } catch (error) {
    alert(error)
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

      <div class="flex flex-col gap-4 mb-6">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          class="px-4 py-2 border rounded-md"
        />
      </div>

      <button @click="login" class="w-full bg-green-600 text-black py-2 rounded-md">
        Iniciar sesión
      </button>

      <p class="text-center text-sm mt-4">
        <router-link to="/register" class="text-black-600"> Regístrate </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
#btnReg {
  text-decoration: none;
  color: black;
}
</style>
