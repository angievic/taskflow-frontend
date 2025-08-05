import React from "react";
import type { RecentActivity } from "../types";
import "./RecentActivities.css";

interface RecentActivitiesProps {
  activities: RecentActivity[];
  loading?: boolean;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities, loading = false }) => {
  if (loading) {
    return (
      <div className="activities-card">
        <div className="activities-header">
          <div className="skeleton-title"></div>
        </div>
        <div className="activities-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="activity-item skeleton">
              <div className="activity-icon skeleton-icon"></div>
              <div className="activity-content">
                <div className="skeleton-text"></div>
                <div className="skeleton-time"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="activities-card">
        <div className="activities-header">
          <h3 className="activities-title">🕒 Recent Activities</h3>
        </div>
        <div className="activities-list">
          <div className="no-activities">
            <p>No recent activities</p>
          </div>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_created':
        return '📝';
      case 'task_completed':
        return '✅';
      case 'project_created':
        return '📁';
      default:
        return '📋';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'task_created':
        return 'blue';
      case 'task_completed':
        return 'green';
      case 'project_created':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMs = now.getTime() - activityTime.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    } else {
      return activityTime.toLocaleDateString();
    }
  };

  return (
    <div className="activities-card">
      <div className="activities-header">
        <h3 className="activities-title">🕒 Recent Activities</h3>
        <span className="activities-count">{activities.length} activities</span>
      </div>
      
      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className={`activity-icon ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <p className="activity-description">{activity.description}</p>
              <div className="activity-meta">
                <span className="activity-time">{formatTimeAgo(activity.timestamp)}</span>
                <span className="activity-type">{activity.related_object_type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="activities-footer">
        <button className="view-all-btn">
          View All Activities
        </button>
      </div>
    </div>
  );
};
