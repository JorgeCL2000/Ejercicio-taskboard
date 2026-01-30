# Ejercicio-taskboard

Esta aplicación web es una gestión de tareas con login/register mediante firebase auth cuya función es mostrarme mi array de tareas que he cogido de una api (https://dummyjson.com/todos) y me muestra las tareas, hay un desplegable añadido para filtrarlas por completadas, no completadas y todas, y luego tenemos un apartado de workspace que recoge las tareas que previamente hemos añadido en nuestro path de task y las vincula a este usuario, es decir no se pueden compartir.

TECNOLOGIAS USADAS:

-Vue 3

-Vite

-Firebase AUTH

-Firestore

-AXIOS

-La API de Dummyjson

-Vercel para el despliegue web

COMO SE HA ESTRUCTURADO EN FIRESTORE:

Se utiliza una única coleccion llamada tasks, en cada documento hay un ID de tarea desde la 1 a la 30, de esa manera me permite evitar duplicados y permitia relacionarlo de manera mas sencilla con la api de firestore ya que se puede ver que cada documento esta nombrado por su propio id de la tarea y una vez clickas en el te puede permitir ver el campo del documento, es decir el assignedTo, completed y su tarea como tal y sobre la lista tasks es simplemente mi colección principal y unica para almacenar las tareas asignadas a cada usuario.

EJECUTAR EN LOCAL:

Clonar el repositorio

Instalar y hacer setup del proyecto con sus dependencias, los pasos a seguir están a partir del ## Project Setup


LINK A VERCEL : 

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
