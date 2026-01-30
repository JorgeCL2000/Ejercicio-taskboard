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
  <div>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Contraseña" />
  </div>
  <div><button @click="registrar">Crear cuenta</button></div>
</template>
<style scoped></style>
