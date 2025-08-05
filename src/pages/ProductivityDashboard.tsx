import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { MetricsCard } from "../components/MetricsCard";
import { TaskCompletionChart } from "../components/TaskCompletionChart";
import { PriorityChart } from "../components/PriorityChart";
import { TimeSpentChart } from "../components/TimeSpentChart";
import { RecentActivities } from "../components/RecentActivities";
import "./ProductivityDashboard.css";

export const ProductivityDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { data, loading, error, refreshData } = useDashboard();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  const formatLastUpdated = () => {
    return new Date().toLocaleString();
  };

  if (error) {
    return (
      <div className="productivity-dashboard">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">TaskFlow</h1>
            <div className="user-info">
              <span>Welcome, {user?.username}</span>
              <button onClick={logout} className="button logout-btn">
                Logout
              </button>
            </div>
          </div>
        </nav>
        
        <main className="main-container">
          <div className="error-container">
            <div className="error-card">
              <h2>⚠️ Error Loading Dashboard</h2>
              <p>{error}</p>
              <button onClick={handleRefresh} className="button retry-btn">
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="productivity-dashboard">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">TaskFlow</h1>
            <div className="nav-actions">
              <Link to="/dashboard" className="nav-link">
                📊 Dashboard
              </Link>
              <Link to="/projects" className="nav-link">
                📁 Projects
              </Link>
            </div>
            <div className="user-info">
              <span>Welcome, {user?.username}</span>
              <button onClick={logout} className="button logout-btn">
                Logout
              </button>
            </div>
          </div>
        </nav>
        
        <main className="main-container">
          <div className="dashboard-header">
            <div className="header-content">
              <h2 className="dashboard-title">📈 Productivity Dashboard</h2>
              <p className="dashboard-subtitle">
                Track your progress and boost your productivity
              </p>
            </div>
            <div className="header-actions">
              <button 
                onClick={handleRefresh} 
                className={`button refresh-btn ${refreshing ? 'refreshing' : ''}`}
                disabled={refreshing}
              >
                {refreshing ? '🔄 Refreshing...' : '🔄 Refresh'}
              </button>
              <div className="last-updated">
                Last updated: {formatLastUpdated()}
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Metrics Overview */}
            <div className="grid-item full-width">
              <ErrorBoundary>
                <MetricsCard 
                  metrics={data?.metrics || {
                    total_tasks: 0,
                    completed_tasks: 0,
                    pending_tasks: 0,
                    in_progress_tasks: 0,
                    completion_rate: 0,
                    total_projects: 0,
                    active_projects: 0,
                    average_completion_time: 0
                  }}
                  loading={loading}
                />
              </ErrorBoundary>
            </div>

            {/* Task Completion Trend */}
            <div className="grid-item large">
              <ErrorBoundary>
                <TaskCompletionChart 
                  data={data?.task_completion_trend || []}
                  loading={loading}
                />
              </ErrorBoundary>
            </div>

            {/* Recent Activities */}
            <div className="grid-item medium">
              <ErrorBoundary>
                <RecentActivities 
                  activities={data?.recent_activities || []}
                  loading={loading}
                />
              </ErrorBoundary>
            </div>

            {/* Priority Distribution */}
            <div className="grid-item medium">
              <ErrorBoundary>
                <PriorityChart 
                  data={data?.priority_distribution || []}
                  loading={loading}
                />
              </ErrorBoundary>
            </div>

            {/* Time Spent by Project */}
            <div className="grid-item medium">
              <ErrorBoundary>
                <TimeSpentChart 
                  data={data?.time_spent_by_project || []}
                  loading={loading}
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <div className="actions-grid">
              <Link to="/projects" className="action-card">
                <div className="action-icon">📁</div>
                <div className="action-content">
                  <h4>View Projects</h4>
                  <p>Manage your active projects</p>
                </div>
              </Link>
              <Link to="/projects" className="action-card">
                <div className="action-icon">➕</div>
                <div className="action-content">
                  <h4>Create Task</h4>
                  <p>Add a new task to track</p>
                </div>
              </Link>
              <Link to="/projects" className="action-card">
                <div className="action-icon">📋</div>
                <div className="action-content">
                  <h4>View All Tasks</h4>
                  <p>See all your tasks</p>
                </div>
              </Link>
              <button onClick={handleRefresh} className="action-card">
                <div className="action-icon">📊</div>
                <div className="action-content">
                  <h4>Refresh Data</h4>
                  <p>Update dashboard metrics</p>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};
