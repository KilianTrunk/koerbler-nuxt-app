<template>
  <div>
    <!-- Display login form when user is not logged in -->
    <div v-if="!authStore.user">
      <LoginForm />
    </div>

    <!-- Display logout button and users tasks (if any) when user is logged in -->
    <div v-else>
      <LogoutButton />
      <TasksSection :tasks="tasksStore.tasks" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore, useTasksStore } from "./store/index";

const authStore = useAuthStore();
const tasksStore = useTasksStore();

// Load data from localStorage on component mount
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    authStore.setUser(JSON.parse(storedUser));
  }

  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasksStore.setTasks(JSON.parse(storedTasks));
  }
});
</script>

<style scoped>
/**/
</style>
