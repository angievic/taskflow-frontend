import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "../services/dashboardService";
import type { DashboardData } from "../types";

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dashboardData = await dashboardService.getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    loading,
    error,
    refreshData
  };
};
