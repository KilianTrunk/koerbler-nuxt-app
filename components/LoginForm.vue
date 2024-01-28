<template>
  <a-form layout="inline" :model="formState" class="form__container">
    <a-form-item>
      <a-input v-model:value="formState.email" placeholder="Email">
        <template #prefix
          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
        <template #prefix
          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
        /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.email === '' || formState.password === ''"
        @click.prevent="login"
        :loading="isLoading"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { useAuthStore, useTasksStore } from "../store/index";
import { reactive } from "vue";
import axios from "axios";

const runtimeConfig = useRuntimeConfig();
const baseApiUrl = runtimeConfig.public.API_BASE_URL;

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const isLoading = ref(false);

const formState = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    isLoading.value = true;

    // Simulate a delay of 2 seconds so it is more realistically
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axios.post(`${baseApiUrl}/auth/user`, {
      email: formState.email,
      password: formState.password,
    });

    // Commit the user information to the Pinia store
    authStore.setUser(response.data);

    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(response.data));

    // Display success notification
    notification.success({
      message: "Login Successful",
      description: "You are now logged in.",
    });
  } catch (error) {
    console.error(error);
    // Display error notification
    notification.error({
      message: "Login Failed",
      description: "Invalid email or password. Please try again.",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.form__container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
