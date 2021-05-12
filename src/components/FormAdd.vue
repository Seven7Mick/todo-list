<template>
  <form class="form" @submit.prevent="submitForm">
    <input class="form__input" type="text" :placeholder="placeholder" v-model="formInputValue" />

    <fieldset v-if="checkboxName" class="form__fieldset-checkbox">
      <input id="check" class="form__checkbox" type="checkbox" v-model="formCheckboxChecked" />
      <label for="check">{{ checkboxName }}</label>
    </fieldset>

    <button class="form__btn" type="submit" :disabled="!disableSubmit">{{ buttonName }}</button>
  </form>
</template>

<script>
export default {
  props: {
    placeholder: String,
    buttonName: String,
    checkboxName: String,
    emitName: String,
  },

  data() {
    return {
      formInputValue: "",
      formCheckboxChecked: false,
    };
  },

  computed: {
    disableSubmit() {
      return this.formInputValue;
    }
  },

  methods: {
    submitForm() {
      this.$emit(this.emitName, this.formInputValue, this.formCheckboxChecked);
      this.formInputValue = "";
      this.formCheckboxChecked = false;
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 0;
  border-top: 1px solid #ccc;
}

.form__input {
  max-width: 500px;
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgb(53, 53, 53);
  border-radius: 5px;
}

.form__input::placeholder {
  color: rgb(56, 56, 56);
  font-size: 12px;
  letter-spacing: 2px;
  text-align: center;
}

.form__fieldset-checkbox {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.form__checkbox {
  margin-right: 5px;
}

.form__btn {
  padding: 5px 10px;
  border: 1px solid rgb(100, 100, 100);
  border-radius: 5px;
  background-color: transparent;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
}
</style>
