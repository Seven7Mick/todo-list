<template>
  <li class="list">
    <button
      :class="[
        'list__choose-btn',
        { 'list__choose-btn_active': isActive },
        { 'list_not-completed': stateNotCompletedList },
        { 'list_completed': stateCompletedList },
      ]"
      type="button"
      v-on:click="$emit('setActiveList', list.id)"
    >
      {{ list.name }}
    </button>

    <button
      class="list__delete-btn"
      v-on:click="$emit('deleteList', list)"
    ></button>
  </li>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: true,
    },
    activeId: {
      type: Number,
    },
  },

  computed: {
    isActive() {
      return this.activeId === this.list.id;
    },
    stateNotCompletedList() {
      return this.list.is_completed == false && this.list.count_tasks;
    },
    stateCompletedList() {
      return this.list.is_completed == true;
    },
  },
};
</script>


<style scoped>
.list {
  display: flex;
  align-items: stretch;
}

.list__choose-btn {
  flex: 1 1 auto;
  position: relative;
  padding: 10px 30px 10px 10px;
  background: none;
  text-align: left;
  font-size: 20px;
  line-height: 150%;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  background-color: rgb(255, 255, 255);
}

.list__choose-btn_active {
  border-color: rgb(13, 45, 255);
}

.list__delete-btn {
  padding: 5px;
  flex: 0 0 50px;
  width: 50px;
  border: 1px solid #ccc;
  background: url("../assets/svg/Close.svg") no-repeat center/20px;
  border-radius: 5px;
  cursor: pointer;
}

.list__delete-btn:hover{
  box-shadow: 2px 2px 3px #ccc;
}

.list__delete-btn:active {
  transform: scale(0.9);
}

.list_not-completed {
  background-color: rgba(5, 99, 5, 0.26);
}

.list_completed {
  background-color: rgba(134, 134, 134, 0.253);
}
</style>
