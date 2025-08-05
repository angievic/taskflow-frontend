import apiClient from "./api";
import type { DashboardData, ProductivityMetrics, TaskCompletionData, TimeSpentData, PriorityDistribution, WeeklyProgress, RecentActivity } from "../types";

export const dashboardService = {
  // Get complete dashboard data
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await apiClient.get("/dashboard/productivity");
    return response.data;
  },

  // Get productivity metrics
  getProductivityMetrics: async (): Promise<ProductivityMetrics> => {
    const response = await apiClient.get("/dashboard/metrics");
    return response.data;
  },

  // Get task completion trend (last 30 days)
  getTaskCompletionTrend: async (days: number = 30): Promise<TaskCompletionData[]> => {
    const response = await apiClient.get(`/dashboard/task-completion-trend?days=${days}`);
    return response.data;
  },

  // Get time spent by project
  getTimeSpentByProject: async (): Promise<TimeSpentData[]> => {
    const response = await apiClient.get("/dashboard/time-spent-by-project");
    return response.data;
  },

  // Get priority distribution
  getPriorityDistribution: async (): Promise<PriorityDistribution[]> => {
    const response = await apiClient.get("/dashboard/priority-distribution");
    return response.data;
  },

  // Get weekly progress
  getWeeklyProgress: async (weeks: number = 8): Promise<WeeklyProgress[]> => {
    const response = await apiClient.get(`/dashboard/weekly-progress?weeks=${weeks}`);
    return response.data;
  },

  // Get recent activities
  getRecentActivities: async (limit: number = 10): Promise<RecentActivity[]> => {
    const response = await apiClient.get(`/dashboard/recent-activities?limit=${limit}`);
    return response.data;
  }
};
