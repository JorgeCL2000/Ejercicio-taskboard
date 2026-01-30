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
    //router.push('') <-- nos llevará a tasks
  } catch (error) {
    alert(error)
  }
}
</script>
<template>
  <div class="datos">
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Contraseña" />
  </div>

  <button @click="login">Iniciar sesion</button>
</template>
<style scoped></style>
