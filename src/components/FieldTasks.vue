<template>
  <div class="field-tasks">
    <h2 class="field-tasks__title">
      {{ activeList ? activeList.name : "Список дел не выбран" }}
    </h2>

    <ul v-if="activeList" class="field-tasks__task-list">
      <Task
        v-for="task of activeListTasks"
        :key="task.id"
        v-bind:task="task"
      />
    </ul>

    <FormAdd
      v-if="activeList"
      class="field-tasks__form"
      v-bind="formAddDataToFieldTasks"
      v-on:addTask="addTask"
    />
  </div>
</template>

<script>
import FormAdd from "./FormAdd";
import Task from "./Task";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    FormAdd,
    Task,
  },

  data() {
    return {
      formAddDataToFieldTasks: {
        placeholder: "Введите дело",
        checkboxName: "Срочно",
        buttonName: "Добавить дело",
        emitName: "addTask",
      },
    };
  },

  computed: mapGetters(["activeListTasks", 'activeList']),

  methods: {
    ...mapActions(["postNewTask"]),
    ...mapMutations([]),

    addTask(taskName, isUrgency) {
      if(this.postNewTask({
        name: taskName,
        list_id: this.activeList.id,
        executor_user_id: this.activeList.user_id,
        urgency: isUrgency ? 5 : 1,
        is_completed: false,
      })){
        alert(`Вы создали дело: ${taskName}`)
      }
      
    },
  },
};
</script>

<style>
.field-tasks {
  flex: 1 1 auto;
  padding: 10px 15px;
  background-color: aliceblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.field-tasks__title {
  font-size: 20px;
  line-height: 200%;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 40px;
}

.field-tasks__task-list {
  overflow: auto;
  padding: 0 5px;
  height: 100%;
}

.field-tasks__form {
  margin-top: auto;
}

.field-tasks__form input[type='text']{
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>