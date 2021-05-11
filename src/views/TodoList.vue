<template>
  <div class="todo-list">
    <FieldLists />
    <FieldTasks />
  </div>
</template>

<script>
import FieldLists from "../components/FieldLists";
import FieldTasks from "../components/FieldTasks";

export default {
  components: {
    FieldLists,
    FieldTasks,
  },
};
</script>

<style scoped>
.todo-list {
  max-width: 1400px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
}
</style>