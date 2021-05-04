<template>
  <div class="field-tasks">
    <h2 class="field-tasks__title">{{ activeList ? activeList.name : 'Список дел не выбран' }}</h2>

    <ul v-if="activeList" class="field-tasks__task-list">
      <Task v-for="task of activeList.tasks" :key="task.id" v-bind:task="task" />
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
import Task from './Task';

import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    FormAdd,
    Task
  },

  data() {
    return {
      formAddDataToFieldTasks: {
        placeholder: "Введите дело",
        checkboxName: "Срочно",
        buttonName: "Добавить дело",
        emitName: 'addTask'
      },
    };
  },

  computed: mapGetters(['activeList']),

  methods: {
    ...mapMutations(["createTask", "watcherForLists"]),

    addTask(taskName, isUrgency) {
      const newTask = {
        id: this.activeList.tasks.length + 1,
        name: taskName,
        list_id: this.activeList.id,
        executor_user_id: 1,
        is_completed: false,
        description: "description task",
        urgency: isUrgency ? 5 : 0,
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
      }

      this.createTask(newTask);
      this.watcherForLists(newTask);
    }
  }
};
</script>

<style scoped>
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

.field-tasks__form {
  margin-top: auto;
}
</style>