<template>
  <li class="task">
    <input
      class="task__checkbox"
      type="checkbox"
      :id="task.id"
      :checked="task.is_completed"
      v-on:change="updateStateTask(task)"
    />

    <label :class="['task__label', { task__label_type_urgency: task.urgency == 5 }]" :for="task.id">
      <div class="task__label-inner">
        <span class="task__name">{{ task.name }}</span>
        <time class="task__time">{{ task.created_at }}</time>
      </div>
    </label>

    <button class="task__button-delete" type="button" v-on:click="confirmDeleteTask({ id: task.id })"></button>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    task: Object,
  },

  methods: {
    ...mapActions(["deleteTask", "updateStateTask"]),

    confirmDeleteTask(id) {
      if (confirm(`Удалить дело ${this.task.name} ?`)) {
        this.deleteTask(id);
      }
    },
  },
};
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
}

.task:not(:last-child) {
  margin-bottom: 10px;
}

.task__checkbox {
  display: none;
}

.task__label {
  display: flex;
  flex: 1 1 auto;
  margin-right: 15px;
  cursor: pointer;
}

.task__label::before {
  content: "";
  flex: 0 0 50px;
  min-height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  margin-right: 15px;
}

.task__checkbox:checked + .task__label::before {
  background: url("../assets/svg/check.svg") no-repeat center/40px;
  animation: checked-btn 0.2s ease-in-out forwards;
}

@keyframes checked-btn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.task__label-inner {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.5;
}

.task__label-inner::before {
  content: "";
  flex: 0 0 25px;
  width: 25px;
  height: 25px;
  margin-right: 15px;
}

.task__label_type_urgency .task__label-inner::before {
  background-image: url("../assets/svg/urgency.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  animation: urgency 5s infinite ease forwards;
}

@keyframes urgency {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.task__name {
  margin-right: 20px;
}

.task__time {
  display: block;
  max-width: 150px;
  width: 100%;
  margin-left: auto;
}

.task__button-delete {
  flex: 0 0 50px;
  min-height: 50px;
  border: 1px solid #ccc;
  background: url("../assets/svg/Close.svg") no-repeat center/20px;
  border-radius: 5px;
  cursor: pointer;
}

.task__button-delete:hover {
  box-shadow: 2px 2px 3px #ccc;
}

.task__button-delete:active {
  transform: scale(0.9);
}
</style>