<template>
  <a-collapse class="taskItem">
    <a-collapse-panel :header="task.name" :key="task.id">
      <div>
        <p>{{ task.description }}</p>
        <div class="taskItem__details">
          <div>
            <strong>Status:</strong> {{ task.done ? "Completed" : "Pending" }}
          </div>
          <div>
            <strong>Deadline:</strong> {{ task.deadline || "Not specified" }}
          </div>
          <div>
            <strong>Assigned to:</strong> {{ task.user || "Unassigned" }}
          </div>
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.taskItem {
  width: 100%;
}
.taskItem__details {
  margin: 16px 0;
}
</style>
