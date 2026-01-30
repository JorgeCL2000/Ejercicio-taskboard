<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'
const api = 'https://dummyjson.com/todos'
const tareasArr = ref([])
const opciones = ref('')

const loading = ref(false)

let getAPI = async () => {
  watch([opciones], async () => {
    loading.value = true
    try {
      let datos = await axios.get(api)

      console.log(datos)
      let tareas = datos.data.todos
      if (opciones.value === 'todas') {
        tareas = datos.data.todos
      }
      if (opciones.value === 'completadas') {
        tareas = tareas.filter((t) => t.completed)
      }
      if (opciones.value === 'pendientes') {
        tareas = tareas.filter((t) => !t.completed)
      }
      tareasArr.value = tareas

      console.log(tareasArr)
    } catch (error) {
      alert(error)
    } finally {
      loading.value = false
    }
  })
}
getAPI()
</script>
<template>
  <select v-model="opciones">
    <option value="todas">Todas</option>
    <option value="completadas">Completadas</option>
    <option value="pendientes">Pendientes</option>
  </select>
  <p v-if="loading">CARGANDO TAREAS</p>
  <div>
    <div v-for="(tarea, index) in tareasArr" :key="index">
      <p><b>Tarea:</b> {{ tarea.todo }}</p>
      <p><b>Completada :</b>{{ tarea.completed }}</p>
      <hr />
    </div>
  </div>
</template>
<style scoped></style>
