<template>
  <div v-if="isLoading" class="tasks__loader"><a-spin size="large" /></div>
  <div v-else>
    <a-typography-title class="tasks__title">Task List</a-typography-title>
    <div v-if="tasks === 0">No tasks available</div>
    <div class="tasks__items__container">
      <TaskItem v-for="task in tasksStore.tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore, useTasksStore } from "../store/index";
import { reactive } from "vue";
import axios from "axios";
import TaskItem from "@/components/TaskItem.vue";

const runtimeConfig = useRuntimeConfig();
const baseApiUrl = runtimeConfig.public.API_BASE_URL;

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const isLoading = ref(false);

onMounted(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasksStore.setTasks(JSON.parse(storedTasks));
  } else {
    // Fetch users tasks
    getTasks();
  }
});
const getTasks = async () => {
  try {
    isLoading.value = true;

    // Simulate a delay of 2 seconds so it is more realistically
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axios.get(`${baseApiUrl}/tasks`, {
      headers: {
        "X-Tenant": authStore.user.tenant_identifier,
        Authorization: `Bearer ${authStore.user.api_token}`,
      },
    });

    // Commit the tasks information to the Pinia store
    tasksStore.setTasks(response.data.data);

    // Save tasks data to localStorage
    localStorage.setItem("tasks", JSON.stringify(response.data.data));

    // Display success notification
    notification.success({
      message: "Retrieval Of Tasks Successful",
      description: "Dive in and get things done.",
    });
  } catch (error) {
    console.error(error);
    // Display error notification
    notification.error({
      message: "Retrieval Of Tasks Failed",
      description: "Please try again.",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.tasks__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.tasks__title {
  text-align: center;
}
.tasks__items__container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 5vw;
}
</style>
