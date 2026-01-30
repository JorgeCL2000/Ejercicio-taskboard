<script setup>
import { sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const registrar = async () => {
  if (!email.value || !password.value) {
    alert('Por favor rellene todos los campos')
    return
  }
  try {
    const datos = await createUserWithEmailAndPassword(auth, email.value, password.value)

    const user = datos.user

    alert('Revise su correo para verificar su cuenta!')

    await sendEmailVerification(user)

    router.push('/login')
  } catch (error) {
    alert(error)
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Crear cuenta</h2>

      <div class="flex flex-col gap-4 mb-6">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button @click="registrar" class="w-full bg-green-600 text-black py-2 rounded-md">
        Crear cuenta
      </button>

      <p class="text-center text-sm mt-4">
        <router-link to="/login" class="text-black-600"> Inicia sesión </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
