import router from '../../router/router'

export default {
  namespaced: true,
  state: {
    user: {},
    addGetParam: null
  },
  mutations: {
  },
  actions: {
    async registerUser(ctx, user) {
      await fetch(
        "https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/user/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      await router.push('/login');
    },

    async loginUser(ctx, user) {

      let response = await fetch("https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        let result = await response.json();
        localStorage.setItem("token", result.data.access_token);
        localStorage.setItem("refresh_token", result.data.refresh_token);

        let refresh_token = { refresh_token: localStorage.getItem("refresh_token") };

        let responseRefToken = await fetch("https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/user/refreshAccessToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(refresh_token),
        });

        let resultRefToken = await responseRefToken.json();
        localStorage.setItem("token", resultRefToken.data.access_token);

        await router.push({ path: '/', query: { fetchData: true } });
        
      }
    },
  },
  getters: {
  }
}