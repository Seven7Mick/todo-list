export default {
  state: {
    lists: [
      {
        id: 1,
        name: "Список с какими-то делами",
        count_tasks: 3,
        is_completed: false,
        is_closed: false,
        created_at: "01.04.2021, 20:48",
        updated_at: "01.04.2021, 20:48",
        tasks: [
          {
            id: 1,
            name: "Что-то сделать",
            list_id: 1,
            executor_user_id: 1,
            is_completed: false,
            description: "description task",
            urgency: 0,
            created_at: "01.02.2021, 20:48",
            updated_at: "01.02.2021, 20:48",
          },
          {
            id: 2,
            name: "Что-то ещё сделать",
            list_id: 1,
            executor_user_id: 1,
            is_completed: true,
            description: "description task",
            urgency: 5,
            created_at: "01.03.2021, 20:48",
            updated_at: "01.03.2021, 20:48",
          },
          {
            id: 3,
            name: "Что-то надо сделать",
            list_id: 1,
            executor_user_id: 1,
            is_completed: false,
            description: "description task",
            urgency: 5,
            created_at: "01.04.2021, 20:48",
            updated_at: "01.04.2021, 20:48",
          },
        ],
      },
      {
        id: 2,
        name: "Второй лист с разными делами",
        count_tasks: 3,
        is_completed: false,
        is_closed: false,
        created_at: "01.05.2021, 20:48",
        updated_at: "01.05.2021, 20:48",
        tasks: [
          {
            id: 1,
            name: "Что?",
            list_id: 2,
            executor_user_id: 1,
            is_completed: false,
            description: "description task",
            urgency: 0,
            created_at: "01.05.2021, 20:48",
            updated_at: "01.05.2021, 20:48",
          },
          {
            id: 2,
            name: "Как?",
            list_id: 2,
            executor_user_id: 1,
            is_completed: true,
            description: "description task",
            urgency: 5,
            created_at: "01.05.2021, 20:48",
            updated_at: "01.05.2021, 20:48",
          },
          {
            id: 3,
            name: "All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy.",
            list_id: 2,
            executor_user_id: 1,
            is_completed: false,
            description: "description task",
            urgency: 5,
            created_at: "01.05.2021, 20:48",
            updated_at: "01.05.2021, 20:48",
          },
        ],
      },
      {
        id: 3,
        name: "Третий лист",
        count_tasks: 3,
        is_completed: true,
        is_closed: false,
        created_at: "01.05.2021, 20:48",
        updated_at: "01.05.2021, 20:48",
        tasks: [
          {
            id: 1,
            name: "А как?",
            list_id: 3,
            executor_user_id: 1,
            is_completed: true,
            description: "description task",
            urgency: 3,
            created_at: "01.05.2021, 20:48",
            updated_at: "01.05.2021, 20:48",
          },
          {
            id: 2,
            name: "А что?",
            list_id: 3,
            executor_user_id: 1,
            is_completed: true,
            description: "description task",
            urgency: 5,
            created_at: "01.05.2021, 20:48",
            updated_at: "01.05.2021, 20:48",
          },
          {
            id: 3,
            name: "All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy.",
            list_id: 3,
            executor_user_id: 1,
            is_completed: true,
            description: "description task",
            urgency: 5,
            created_at: "01.05.2021, 20:48",
            updated_at: "01.05.2021, 20:48",
          },
        ],
      },
    ],
    activeListId: null,
    valueFilteredLists: "not-completed",
  },

  actions: {
    // async fetchLists(ctx, limit = 6) {
    //   const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=' + limit)
    //   const todosLists = await res.json();

    //   ctx.commit('updateLists', todosLists)
    // }
  },

  mutations: {
    // updateLists(state, todosLists) {
    //   state.lists = todosLists
    // },


    watcherForLists(state, newTask) {
      if (newTask) {
        let targetList = state.lists.find(list => list.id == newTask.list_id);

        targetList.count_tasks = targetList.tasks.length;
        targetList.updated_at = newTask.updated_at;
        targetList.is_completed = false;
      }
    },

    createList(state, newList) {
      state.lists.push(newList)
      alert(`Вы добавили список задач: "${newList.name}"`);
    },

    deleteList(state, getList) {
      if (confirm(`Удалить список дел: "${getList.name}"`)) {
        state.lists = state.lists.filter(list => list.id !== getList.id);
      }
    },

    setActiveList(state, listId) {
      state.activeListId = listId;
    },

    toggleTaskState(state, targetTask) {
      targetTask.is_completed = !targetTask.is_completed;

      if (targetTask) {
        let targetList = state.lists.find(list => list.id == targetTask.list_id);

        const completedTaskofList = targetList.tasks.find(task => task.is_completed == false);

        if (completedTaskofList) {
          return targetList.is_completed = false
        }
        if (!completedTaskofList) {
          targetList.is_completed = true
        }
      }
    },

    deleteTask(state, payload) {
      const { listId, taskId, taskName } = payload;
      const targetList = state.lists.find(list => list.id === listId);
      if (confirm(`Удалить задачу: "${taskName}"`)) {
        targetList.tasks = targetList.tasks.filter(task => task.id !== taskId);
        
        const completedTaskofList = targetList.tasks.find(task => task.is_completed == false);

        if (completedTaskofList) {
          return targetList.is_completed = false
        }
        if (!completedTaskofList) {
          targetList.is_completed = true
        }
      }
    },

    createTask(state, task) {
      state.lists.find(list => list.id == task.list_id).tasks.push(task);
      alert(`Вы добавили задачу: "${task.name}"`);
    }
  },

  getters: {

    allLists(state) {
      return state.lists
    },

    activeList(state) {
      return state.lists.find(list => list.id === state.activeListId);
    },

    filteredLists(state) {
      // Sort tasks
      for (let list of state.lists) {
        list.tasks.sort((a, b) => {
          if (a.created_at > b.created_at) {
            return -1;
          }
          if (a.created_at < b.created_at) {
            return 1;
          }
          return 0;
        });
      }
      // Sort and filter lists
      if (state.valueFilteredLists === "all") {
        return state.lists.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      if (state.valueFilteredLists === "completed") {
        return state.lists.filter(list => list.is_completed === true).sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      if (state.valueFilteredLists === "not-completed") {

        return state.lists.filter(list => list.is_completed === false).sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
    }
  },
}
