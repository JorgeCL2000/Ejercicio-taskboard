<script setup>
import { ref } from 'vue'
import { db, auth } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const tareas = ref([])
const user = ref(null)

onAuthStateChanged(auth, async (u) => {
  user.value = u
  if (u) cargarWorkspace()
})

const cargarWorkspace = async () => {
  const q = query(collection(db, 'tasks'), where('assignedTo', '==', user.value.uid))

  const snapshot = await getDocs(q)

  tareas.value = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }))
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <button>
      <router-link to="/tareas" id="btn" class="bg-blue-600 text-white px-4 py-2 m-3 rounded-md"
        >Tareas</router-link
      >
    </button>

    <div
      v-for="tarea in tareas"
      :key="tarea.id"
      class="bg-white p-4 rounded-lg m-3 shadow-sm flex justify-between items-center"
    >
      <p><b>Tarea:</b> {{ tarea.todo }}</p>

      <hr />
    </div>
  </div>
</template>

<style scoped></style>
