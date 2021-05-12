export default {
  state: {
    lists: [],
    tasks: [],
    activeListId: null,
    valueFilteredLists: "not-completed",
  },

  actions: {
    // Получение листов
    async fetchLists(ctx) {
      const res = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/list?access_token=${localStorage.getItem('token')}`)
      const todosLists = await res.json();
      const { data } = todosLists;

      ctx.commit('updateLists', data);
    },
    // Пост нового листа
    async postNewList(ctx, newList) {
      const data = {
        attributes: newList
      }

      const res = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/list/create/?access_token=${localStorage.getItem('token')}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const responseData = await res.json();

      if (responseData.status === "success") {
        ctx.commit('addNewList', responseData.data.attributes)

      }
    },

    // Обновление состояни Листа
    async updateStateList(ctx, { list, listIsCompleted }) {

      const data = {
        attributes: {
          is_completed: listIsCompleted,
          is_closed: list.is_closed,
          name: list.name
        }
      }

      const updateList = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/list/${list.id}/?access_token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await updateList.json();

      if (resData.message === 'Updated!') {
        ctx.commit('updateStateLists', data.attributes)
      }
    },

    // Удаление листа
    async deleteList(ctx, list) {
      if (confirm(`Удалить список ${list.name} ?`)) {
        const res = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/list/${list.id}/?access_token=${localStorage.getItem('token')}`, {
          method: 'DELETE'
        });

        const data = await res.json();

        if (data.message === 'Deleted!') {
          ctx.commit('deleteList', list.id)
        }
      }
    },

    // Получение задач
    async fetchTasks(ctx) {
      const responseTasks = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/task?access_token=${localStorage.getItem('token')}`)
      const todosTasks = await responseTasks.json();
      const { data } = todosTasks;

      ctx.commit('getTasks', data.items);
    },
    // Пост нового дела
    async postNewTask(ctx, newTask) {

      const data = {
        attributes: newTask
      }

      const responsePostTask = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/task/create/?access_token=${localStorage.getItem('token')}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const responseDataTask = await responsePostTask.json();

      if (responseDataTask.status === "success") {
        ctx.commit('addNewTask', responseDataTask.data.attributes)
      }
    },

    // Обновление дела
    async updateStateTask(ctx, task) {
      const data = {
        attributes: {
          is_completed: !task.is_completed,
          list_id: task.list_id,
          name: task.name,
          urgency: task.urgency,
        }
      }

      const updateTask = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/task/${task.id}/?access_token=${localStorage.getItem('token')}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await updateTask.json();

      if (resData.message === 'Updated!') {
        ctx.commit('toggleTaskState', resData.data.attributes);
      }
    },

    // Удаление задачи
    async deleteTask(ctx, task) {
      const resDelTask = await fetch(`https://academy2.smw.tom.ru/vasilchenko-konstantin/todo-list/task/${task.id}/?access_token=${localStorage.getItem('token')}`, {
        method: 'DELETE'
      });

      const data = await resDelTask.json();

      if (data.message === 'Deleted!') {
        ctx.commit('deleteTask', task.id)
      }
    },

  },

  mutations: {
    updateLists(state, todosLists) {
      state.lists = todosLists;
    },

    addNewList(state, newList) {
      state.lists.push(newList)
    },

    updateStateLists(state, atr) {
      let { is_completed, is_closed, name } = atr

      let list = state.lists.find(list => list.name === name)

      list.is_completed = is_completed;
      list.is_closed = is_closed;
    },

    deleteList(state, id) {
      state.lists = state.lists.filter(list => list.id !== id);
    },

    setActiveList(state, listId) {
      state.activeListId = listId;
    },

    getTasks(state, todosTasks) {
      state.tasks = todosTasks;
    },

    toggleTaskState(state, targetTask) {
      state.tasks.find(task => task.id === targetTask.id).is_completed = targetTask.is_completed;

      // меняем состояние листов 
      let currentListIsComplite = true;

      for (let task of state.tasks) {
        if (task.list_id === targetTask.list_id && !task.is_completed) {
          currentListIsComplite = false;
          break;
        }
      }

      state.lists.find(list => list.id === targetTask.list_id).is_completed = currentListIsComplite;
    },

    deleteTask(state, taskId) {
      const listId = state.tasks.find(task => task.id === taskId).list_id;

      state.tasks = state.tasks.filter(task => task.id !== taskId);

      let watcherTaksOfList = state.tasks.find(task => task.list_id === listId)
      if (!watcherTaksOfList) {
        state.lists.find(list => list.id === listId).is_completed = false;
        state.lists.find(list => list.id === listId).count_tasks = 0;
      }

    },

    addNewTask(state, newTask) {
      state.tasks.push(newTask);
      state.lists.find(list => list.id === newTask.list_id).count_tasks++
    }
  },

  getters: {
    allLists(state) {
      return state.lists
    },

    activeListTasks(state) {
      return state.tasks.filter(task => task.list_id === state.activeListId);
    },

    activeList(state) {
      return state.lists.find(list => list.id === state.activeListId)
    },

    filteredLists(state) {
      // Sort tasks
      state.tasks.sort((a, b) => {
        if (a.created_at > b.created_at) {
          return -1;
        }
        if (a.created_at < b.created_at) {
          return 1;
        }
        return 0;
      });
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
