import React from "react";
import type { TaskCompletionData } from "../types";
import "./TaskCompletionChart.css";

interface TaskCompletionChartProps {
  data: TaskCompletionData[];
  loading?: boolean;
}

export const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <div className="skeleton-title"></div>
        </div>
        <div className="chart-container">
          <div className="chart-skeleton">
            <div className="skeleton-chart"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">📈 Task Completion Trend</h3>
        </div>
        <div className="chart-container">
          <div className="no-data">
            <p>No data available</p>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.completed_tasks));
  const minValue = Math.min(...data.map(d => d.completed_tasks));
  const range = maxValue - minValue || 1;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">📈 Task Completion Trend</h3>
        <div className="chart-stats">
          <span className="stat">
            <strong>Max:</strong> {maxValue}
          </span>
          <span className="stat">
            <strong>Avg:</strong> {(data.reduce((sum, d) => sum + d.completed_tasks, 0) / data.length).toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-grid">
          {/* Y-axis labels */}
          <div className="y-axis">
            {[maxValue, Math.round(maxValue * 0.75), Math.round(maxValue * 0.5), Math.round(maxValue * 0.25), 0].map((value, index) => (
              <div key={index} className="y-label">{value}</div>
            ))}
          </div>
          
          {/* Chart area */}
          <div className="chart-area">
            <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="0.5"
                />
              ))}
              
              {/* Data line */}
              <polyline
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                points={data.map((d, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = 100 - ((d.completed_tasks - minValue) / range) * 100;
                  return `${x},${y}`;
                }).join(' ')}
              />
              
              {/* Data points */}
              {data.map((d, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((d.completed_tasks - minValue) / range) * 100;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="1.5"
                    fill="#4f46e5"
                    className="data-point"
                  />
                );
              })}
            </svg>
            
            {/* Hover overlay for tooltips */}
            <div className="chart-overlay">
              {data.map((d, index) => (
                <div
                  key={index}
                  className="data-point-trigger"
                  style={{
                    left: `${(index / (data.length - 1)) * 100}%`,
                  }}
                  title={`${formatDate(d.date)}: ${d.completed_tasks} tasks`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="x-axis">
          {data.filter((_, index) => index % Math.ceil(data.length / 6) === 0).map((d, index) => (
            <div key={index} className="x-label">
              {formatDate(d.date)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
