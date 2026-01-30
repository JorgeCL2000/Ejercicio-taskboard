<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { db, auth } from '@/firebase'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import router from '@/router'

const api = 'https://dummyjson.com/todos'

const opciones = ref('todas')
const loading = ref(false)
const tareasBase = ref([])
const user = ref(null)

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    alert(error)
  }
}
onAuthStateChanged(auth, async (u) => {
  user.value = u

  if (!u) {
    loading.value = false
    return
  }

  await cargarTareas()
})

const cargarTareas = async () => {
  loading.value = true
  try {
    const { data } = await axios.get(api)

    const snapshot = await getDocs(collection(db, 'tasks'))
    const asignadas = {}

    snapshot.forEach((d) => {
      asignadas[d.id] = d.data().assignedTo
    })

    tareasBase.value = data.todos.map((t) => ({
      ...t,
      assignedTo: asignadas[t.id] ?? null,
    }))
  } catch (error) {
    console.error(error)
    alert('Error cargando tareas')
  } finally {
    loading.value = false
  }
}

const tareasArr = computed(() => {
  if (opciones.value === 'todas') return tareasBase.value
  if (opciones.value === 'completadas') return tareasBase.value.filter((t) => t.completed)
  if (opciones.value === 'pendientes') return tareasBase.value.filter((t) => !t.completed)
  return tareasBase.value
})

const agregarTarea = async (tarea) => {
  if (!user.value) return

  tarea.assignedTo = user.value.uid

  await setDoc(doc(db, 'tasks', String(tarea.id)), {
    todo: tarea.todo,
    completed: tarea.completed,
    assignedTo: user.value.uid,
  })
}
</script>

<template>
  <button @click="logout">Cerrar Sesión</button>

  <select v-model="opciones">
    <option value="todas">Todas</option>
    <option value="completadas">Completadas</option>
    <option value="pendientes">Pendientes</option>
  </select>

  <p v-if="loading">CARGANDO TAREAS...</p>

  <p v-else-if="!tareasArr.length">No hay tareas disponibles</p>

  <div v-else>
    <div v-for="tarea in tareasArr" :key="tarea.id">
      <p><b>Tarea:</b> {{ tarea.todo }}</p>

      <p v-if="tarea.completed">Finalizada</p>

      <button v-else-if="!tarea.assignedTo" @click="agregarTarea(tarea)">Agregar</button>

      <p v-else>Asignada</p>

      <hr />
    </div>
  </div>
</template>

<style scoped>
#btn {
  text-decoration: none;
  color: black;
}
</style>
