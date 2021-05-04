<template>
  <div class="field-lists">
    <div class="field-lists__filter">
      <!-- filter -->
      <select class="field-lists__filter-select" v-model="filter">
        <option value="all">Все</option>
        <option value="not-completed">Незавершенные</option>
        <option value="completed">Завершенные</option>
      </select>
    </div>

    <ul class="field-lists__lists">
      <List
        class="field-lists__lists-item"
        v-for="list of filteredLists"
        :key="list.id"
        :activeId="$store.state.lists.activeListId"
        :list="list"
        v-on:deleteList="deleteList"
        v-on:setActiveList="setActiveList"
      />
    </ul>

    <FormAdd
      class="field-lists__form"
      v-bind="formAddDataToFieldLists"
      v-on:addList="createdListForTasks"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import List from "./List";
import FormAdd from "./FormAdd";

export default {
  components: {
    List,
    FormAdd,
  },

  data() {
    return {
      formAddDataToFieldLists: {
        placeholder: "Введите название списка",
        buttonName: "Добавить Список",
        checkboxName: null,
        emitName: "addList",
      },
      filter: "not-completed",
    };
  },

  computed: {
    ...mapGetters(["allLists", "filteredLists"]),
  },

  methods: {
    ...mapMutations(["deleteList", "createList", "setActiveList"]),

    createdListForTasks(listName) {
      this.createList({
        name: listName,
        id: this.$store.state.lists.lists.length + 1,
        created_at: new Date().toLocaleString("ru", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        updated_at: new Date().toLocaleString("ru", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        count_tasks: 0,
        tasks: [],
        is_closed: false,
        is_completed: false,
      });
    },
  },
  watch: {
    filter(value) {
      this.$store.state.lists.valueFilteredLists = value;
    }
  }
};
</script>

<style>
.field-lists {
  flex: 0 0 500px;
  height: 100%;
  padding: 10px 15px;
  background-color: aliceblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 15px;
}

.field-lists__filter {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}

.field-lists__filter-select {
  display: block;
  padding: 5px;
  width: 300px;
  text-align: center;
  font-size: 16px;
}

.field-lists__lists {
  height: 100%;
  padding: 10px 15px;
}
.field-lists__lists-item:not(:last-child) {
  margin-bottom: 10px;
}

.field-lists__form {
  padding: 10px 15px;
  border-top: 1px solid #ccc;
}

.field-lists__form input {
  margin-bottom: 10px;
}

.field-lists__form.form {
  justify-content: flex-end;
}
</style>
