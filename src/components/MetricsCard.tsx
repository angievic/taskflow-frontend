import React from "react";
import type { ProductivityMetrics } from "../types";
import "./MetricsCard.css";

interface MetricsCardProps {
  metrics: ProductivityMetrics;
  loading?: boolean;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ metrics, loading = false }) => {
  if (loading) {
    return (
      <div className="metrics-card">
        <div className="metrics-grid loading">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="metric-item skeleton">
              <div className="skeleton-text"></div>
              <div className="skeleton-number"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const metricItems = [
    {
      label: "Total Tasks",
      value: metrics.total_tasks,
      icon: "📋",
      color: "blue"
    },
    {
      label: "Completed",
      value: metrics.completed_tasks,
      icon: "✅",
      color: "green"
    },
    {
      label: "In Progress",
      value: metrics.in_progress_tasks,
      icon: "🔄",
      color: "orange"
    },
    {
      label: "Pending",
      value: metrics.pending_tasks,
      icon: "⏳",
      color: "gray"
    },
    {
      label: "Completion Rate",
      value: `${metrics.completion_rate.toFixed(1)}%`,
      icon: "📊",
      color: "purple"
    },
    {
      label: "Active Projects",
      value: metrics.active_projects,
      icon: "📁",
      color: "teal"
    }
  ];

  return (
    <div className="metrics-card">
      <h3 className="metrics-title">Productivity Overview</h3>
      <div className="metrics-grid">
        {metricItems.map((item, index) => (
          <div key={index} className={`metric-item ${item.color}`}>
            <div className="metric-icon">{item.icon}</div>
            <div className="metric-content">
              <div className="metric-value">{item.value}</div>
              <div className="metric-label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
