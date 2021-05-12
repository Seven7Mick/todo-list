<template>
  <div class="sign-in">
    <form class="sign-in__form" @submit.prevent="login">
      <h2 class="sign-in__title">Вход</h2>

      <fieldset class="sign-in__fieldset">
        <label class="sign-in__label" for="email">Email</label>
        <input
          id="email"
          class="sign-in__input"
          required
          v-model="user.email"
          type="email"
          placeholder="Введите Email"
        />
      </fieldset>

      <fieldset class="sign-in__fieldset">
        <label class="sign-in__label" for="password">Пароль</label>
        <input
          id="password"
          class="sign-in__input"
          required
          v-model="user.password"
          type="password"
          placeholder="Введите пароль"
        />
      </fieldset>

      <button class="sign-in__btn" type="submit">Login</button>

      <router-link class="link-ger" to="/register"
        >Зарегистрироваться</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch('auth/loginUser', this.user);

      // let response = await fetch("https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/user/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(user),
      // });

      // if(response.ok){
      //   localStorage.setItem("access_token", )
      // }

      // let result = await response.json();
      // let token = result.data.access_token;
      // let refreshToken = result.data.refresh_token;
      // console.log(token, refreshToken);

      // const reader = response.body.getReader();

      // while(true){
      //   const {done, value} = await reader.read();
      //   if (done) {
      //     break;
      //   }
      //   console.log(value);
      // }

      // await this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.sign-in {
  max-width: 400px;
  margin: 0 auto;
}
.sign-in__form {
  padding: 10px 15px;
  background-color: aliceblue;
  border-radius: 10px;
}
.sign-in__title {
  font-size: 20px;
  line-height: 200%;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 40px;
}

.sign-in__fieldset {
  margin-bottom: 30px;
}

.sign-in__label {
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #756f86;
  margin-bottom: 8px;
  cursor: pointer;
}
.sign-in__input {
  padding: 16px;
  display: block;
  width: 100%;
  border: 1px solid #dbe2ea;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
}

.sign-in__input:focus,
.sign-in__input:hover {
  border: 1px solid #0880ae;
}

.sign-in__btn {
  width: 100%;
  height: 56px;
  margin-bottom: 20px;
  background: #0880ae;
  box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08),
    0px 4px 8px rgba(44, 39, 56, 0.08);
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #ebf4f8;
  border: none;
}

.sign-in__btn:hover {
  box-shadow: 0px 12px 24px rgba(44, 39, 56, 0.08),
    0px 24px 48px rgba(44, 39, 56, 0.16);
}

.sign-in__btn:active {
  border: 2px solid rgba(44, 39, 56, 0.86);
  box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.0001),
    0px 4px 8px rgba(44, 39, 56, 0.08);
}

.sign-in__btn:disabled {
  background: #dbe2ea;
  box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08),
    0px 4px 8px rgba(44, 39, 56, 0.08);
  border-radius: 6px;
  color: #2c2738;
  opacity: 0.5;
}

.link-ger {
  display: block;
  margin: 0 auto;
  max-width: 160px;
  text-align: center;
  color: brown;
}
</style>