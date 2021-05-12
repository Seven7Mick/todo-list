<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Приложение</router-link>
      <router-link to="/login">Вход</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  async mounted() {
    const token = localStorage.getItem('token');

    if (token) {
      const user = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/user?access_token=${token}`);

      if (user.ok) {
        this.$store.dispatch("fetchLists");
        this.$store.dispatch("fetchTasks");

        return;
      }
    }

    if (this.$router.currentRoute.name !== 'login') {
      this.$router.push("/login");
    }
  },

  watch: {
    $route(to) {
      if (to.query.fetchData) {
        this.$store.dispatch("fetchLists");
        this.$store.dispatch("fetchTasks");
      }
    }
  }
};
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

a {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #2c3e50;
  width: 100%;
  height: 100vh;
  padding: 40px 0;
}

.container {
  max-width: 1440px;
  padding: 0 20px;
  height: 95%;
  margin: 0 auto;
}

fieldset {
  border: none;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  padding: 5px 15px;
  margin: 0 auto;
  background-color: aliceblue;
  margin-bottom: 10px;
  border-radius: 10px;
}
</style>
