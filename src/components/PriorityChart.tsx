import React from "react";
import type { PriorityDistribution } from "../types";
import "./PriorityChart.css";

interface PriorityChartProps {
  data: PriorityDistribution[];
  loading?: boolean;
}

export const PriorityChart: React.FC<PriorityChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="priority-card">
        <div className="priority-header">
          <div className="skeleton-title"></div>
        </div>
        <div className="priority-content">
          <div className="priority-skeleton">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="skeleton-priority-item">
                <div className="skeleton-bar"></div>
                <div className="skeleton-label"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="priority-card">
        <div className="priority-header">
          <h3 className="priority-title">🎯 Task Priority Distribution</h3>
        </div>
        <div className="priority-content">
          <div className="no-data">
            <p>No data available</p>
          </div>
        </div>
      </div>
    );
  }

  const priorityConfig = {
    high: { color: "#ef4444", icon: "🔴", label: "High Priority" },
    medium: { color: "#f59e0b", icon: "🟡", label: "Medium Priority" },
    low: { color: "#10b981", icon: "🟢", label: "Low Priority" }
  };

  const totalTasks = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="priority-card">
      <div className="priority-header">
        <h3 className="priority-title">🎯 Task Priority Distribution</h3>
        <div className="total-tasks">
          <span>Total: {totalTasks} tasks</span>
        </div>
      </div>
      
      <div className="priority-content">
        <div className="priority-bars">
          {data.map((item) => {
            const config = priorityConfig[item.priority];
            const width = totalTasks > 0 ? (item.count / totalTasks) * 100 : 0;
            
            return (
              <div key={item.priority} className="priority-item">
                <div className="priority-info">
                  <div className="priority-label">
                    <span className="priority-icon">{config.icon}</span>
                    <span className="priority-name">{config.label}</span>
                  </div>
                  <div className="priority-stats">
                    <span className="priority-count">{item.count}</span>
                    <span className="priority-percentage">({item.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="priority-bar-container">
                  <div 
                    className="priority-bar"
                    style={{ 
                      width: `${width}%`,
                      backgroundColor: config.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary stats */}
        <div className="priority-summary">
          <div className="summary-item">
            <span className="summary-label">Most Common:</span>
            <span className="summary-value">
              {data.sort((a, b) => b.count - a.count)[0]?.priority || 'N/A'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">High Priority:</span>
            <span className="summary-value">
              {data.find(d => d.priority === 'high')?.percentage.toFixed(1) || '0'}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
