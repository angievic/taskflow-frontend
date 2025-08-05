import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import apiClient from "../services/api";
import { ProductivityDashboard } from "./ProductivityDashboard";
import "./DashboardPage.css";

type DashboardData = Record<string, string | number>;

type ViewMode = "simple" | "productivity";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("productivity");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/dashboard/");
        setDashboardData(response.data);
      } catch {
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    if (viewMode === "simple") {
      fetchData();
    }
  }, [viewMode]);

  // Default to productivity dashboard
  if (viewMode === "productivity") {
    return <ProductivityDashboard />;
  }

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">TaskFlow</h1>
          <div className="view-toggle">
            <button 
              onClick={() => setViewMode("simple")}
              className={`toggle-btn ${viewMode === "simple" ? "active" : ""}`}
            >
              Simple
            </button>
            <button 
              onClick={() => setViewMode("productivity")}
              className={`toggle-btn ${(viewMode as string) === "productivity" ? "active" : ""}`}
            >
              Productivity
            </button>
          </div>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="button">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="container">
        <div className="header">
          <h2>Simple Dashboard</h2>
          <Link to="/projects" className="button">
            View Projects
          </Link>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {dashboardData && (
          <div className="dashboard-grid">
            {Object.entries(dashboardData).map(([key, value]) => (
              <div key={key} className="card">
                <h3>{key.replace(/_/g, " ")}</h3>
                <p>{String(value)}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage; 