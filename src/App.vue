<template>
  <div id="app">
    <div class="container">
      <FieldLists />
      <FieldTasks />
    </div>
  </div>
</template>

<script>
import FieldLists from './components/FieldLists'
import FieldTasks from './components/FieldTasks'

export default {
  name: 'App',
  components: {
    FieldLists,
    FieldTasks
  },
  async mounted() {
    // this.fetchLists()
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul,
li {
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #2c3e50;
  width: 100%;
  height: 100vh;
  padding: 30px 0;
}

.container {
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  display: flex;
}


fieldset {
  border: none;
}
</style>
