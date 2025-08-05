export interface Project {
  name: string;
  description?: string;
  id: number;
  owner_id: number;
}
export interface ProjectCreate {
  name: string;
  description?: string;
}
export interface ProjectUpdate {
  name: string;
  description?: string;
}
export interface Tag {
  name: string;
  id: number;
}
export interface Task {
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date?: string;
  tags: Tag[];
  id: number;
  owner_id: number;
}
export interface TaskCreate {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  due_date?: string;
  tags?: string[];
  project_id?: number;
}
export interface TaskUpdate {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  due_date?: string;
  tags?: string[];
}
export interface Token {
  access_token: string;
  token_type: string;
}
export interface User {
  email: string;
  id: number;
  username: string;
  is_active: boolean;
  is_superuser: boolean;
}
export interface UserCreate {
  email: string;
  username: string;
  password?: string;
}

// Dashboard types
export interface ProductivityMetrics {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  completion_rate: number;
  total_projects: number;
  active_projects: number;
  average_completion_time: number;
}

export interface TaskCompletionData {
  date: string;
  completed_tasks: number;
}

export interface TimeSpentData {
  project_name: string;
  total_time: number;
  task_count: number;
}

export interface PriorityDistribution {
  priority: "low" | "medium" | "high";
  count: number;
  percentage: number;
}

export interface WeeklyProgress {
  week_start: string;
  week_end: string;
  tasks_completed: number;
  tasks_created: number;
  productivity_score: number;
}

export interface DashboardData {
  metrics: ProductivityMetrics;
  task_completion_trend: TaskCompletionData[];
  time_spent_by_project: TimeSpentData[];
  priority_distribution: PriorityDistribution[];
  weekly_progress: WeeklyProgress[];
  recent_activities: RecentActivity[];
}

export interface RecentActivity {
  id: number;
  type: "task_created" | "task_completed" | "project_created";
  description: string;
  timestamp: string;
  related_object_id: number;
  related_object_type: "task" | "project";
} 