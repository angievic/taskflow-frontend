import React from "react";
import type { TimeSpentData } from "../types";
import "./TimeSpentChart.css";

interface TimeSpentChartProps {
  data: TimeSpentData[];
  loading?: boolean;
}

export const TimeSpentChart: React.FC<TimeSpentChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="time-spent-card">
        <div className="time-spent-header">
          <div className="skeleton-title"></div>
        </div>
        <div className="time-spent-content">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="time-spent-item skeleton">
              <div className="skeleton-project"></div>
              <div className="skeleton-bar"></div>
              <div className="skeleton-time"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="time-spent-card">
        <div className="time-spent-header">
          <h3 className="time-spent-title">⏱️ Time Spent by Project</h3>
        </div>
        <div className="time-spent-content">
          <div className="no-data">
            <p>No time tracking data available</p>
          </div>
        </div>
      </div>
    );
  }

  const maxTime = Math.max(...data.map(d => d.total_time));
  const totalTime = data.reduce((sum, d) => sum + d.total_time, 0);

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getProjectColor = (index: number) => {
    const colors = [
      '#4f46e5', '#10b981', '#f59e0b', '#ef4444', 
      '#8b5cf6', '#14b8a6', '#f97316', '#ec4899'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="time-spent-card">
      <div className="time-spent-header">
        <h3 className="time-spent-title">⏱️ Time Spent by Project</h3>
        <div className="total-time">
          Total: {formatTime(totalTime)}
        </div>
      </div>
      
      <div className="time-spent-content">
        {data.map((item, index) => {
          const percentage = maxTime > 0 ? (item.total_time / maxTime) * 100 : 0;
          const color = getProjectColor(index);
          
          return (
            <div key={index} className="time-spent-item">
              <div className="project-info">
                <div className="project-name" title={item.project_name}>
                  {item.project_name}
                </div>
                <div className="project-stats">
                  <span className="task-count">{item.task_count} tasks</span>
                </div>
              </div>
              
              <div className="time-bar-container">
                <div 
                  className="time-bar"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                />
              </div>
              
              <div className="time-value">
                {formatTime(item.total_time)}
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length > 0 && (
        <div className="time-spent-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Average per project:</span>
              <span className="stat-value">{formatTime(Math.round(totalTime / data.length))}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Most active:</span>
              <span className="stat-value">
                {data.sort((a, b) => b.total_time - a.total_time)[0]?.project_name || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
