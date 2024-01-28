<template>
  <a-button
    type="primary"
    html-type="button"
    @click.prevent="logout"
    :loading="isLoading"
  >
    Log out
  </a-button>
</template>
<script setup>
import { useAuthStore, useTasksStore } from "../store/index";

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const isLoading = ref(false);

const logout = async () => {
  try {
    isLoading.value = true;

    // Simulate a delay of 2 seconds so it is more realistically
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear user information in the Pinia store
    authStore.clearUser();

    // Clear tasks information in the Pinia store
    tasksStore.clearTasks();

    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Remove tasks data from localStorage
    localStorage.removeItem("tasks");

    // Display logout notification
    notification.success({
      message: "Logout Successful",
      description: "You are now logged out.",
    });
  } catch (error) {
    // Display error notification
    notification.error({
      message: "Logout Error",
      description: "Please try again.",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
