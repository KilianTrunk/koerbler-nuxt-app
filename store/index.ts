import { defineStore } from "pinia";

interface IUser {
  id: number;
  api_token: string;
  tenant_identifier: string;
}

interface ITask {
  id: number;
  name: string;
  description: string;
  user: number;
  done: number;
  personal: number;
  project: number;
  customer: number | null;
  opportunity: number | null;
  time: string;
  userprio: number;
  planed_date: string | null;
  created_by: number;
  last_user: number;
  assigned_by: number;
  assigned_at: string | null;
  updated: string;
  deadline: string;
  wait_for_contact: number;
  start_date: string | null;
  end_date: string | null;
  parent_task_id: number | null;
  percent_done: number;
  estimate: number;
  predecessor_task_id: number | null;
  inbox: number;
  generally: number;
  someday: number;
  archiv: number;
  today_pos: number;
  next_pos: number | null;
  someday_pos: number | null;
  ticket_pos: number;
  units: number;
  hours_per_unit: number;
  activity: number | null;
  is_clearable: number;
  is_cleared: number;
  kss_visible: number;
  from_contact: number | null;
  status_id: number | null;
  project_type: number | null;
  task_category_id: number | null;
  is_ticket: number;
  timetracking_restriction: number;
  task_priority_id: number | null;
  task_type_id: number | null;
  planned_start_date: string | null;
  planned_end_date: string | null;
  custom_tab_mode: string | null;
  proposal: number | null;
  done_at: string | null;
  to_contact: number | null;
  department_id: number | null;
  product: number | null;
  unread: number;
  rrule: string | null;
  survey_id: number | null;
  industry_id: number | null;
  kss_notification: number;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | IUser,
  }),

  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: null as null | ITask[],
  }),

  actions: {
    setTasks(tasks: ITask[]) {
      this.tasks = tasks;
    },
    clearTasks() {
      this.tasks = null;
    },
  },
});

export const setupStore = () => {
  return {
    auth: useAuthStore(),
  };
};
