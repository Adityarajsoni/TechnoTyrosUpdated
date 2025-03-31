import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Sample data
  const currentStats = {
    average: 80,
    median: 83,
    highest: 97,
    lowest: 50,
    totalStudents: 45,
    passRate: 85
  };

  const monthlyData = [
    { month: 'Jan', value: 78 },
    { month: 'Feb', value: 82 },
    { month: 'Mar', value: 75 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 80 }
  ];

  useEffect(() => {
    setAnimateProgress(true);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <i className='bx bxs-graduation'></i>
          Class Performance Dashboard
        </h1>
        <p className="dashboard-subtitle">Academic Year {new Date().getFullYear()}</p>
      </div>

      {/* Main Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-value" style={{ color: '#2196f3' }}>{currentStats.average}%</div>
              <div className="stat-label">Class Average</div>
            </div>
            <div className="stat-icon blue-theme">
              <i className='bx bx-line-chart'></i>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: animateProgress ? `${currentStats.average}%` : '0%',
                backgroundColor: '#2196f3'
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-value" style={{ color: '#4caf50' }}>{currentStats.highest}%</div>
              <div className="stat-label">Highest Score</div>
            </div>
            <div className="stat-icon green-theme">
              <i className='bx bx-trophy'></i>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: animateProgress ? `${currentStats.highest}%` : '0%',
                backgroundColor: '#4caf50'
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-value" style={{ color: '#f44336' }}>{currentStats.lowest}%</div>
              <div className="stat-label">Lowest Score</div>
            </div>
            <div className="stat-icon red-theme">
              <i className='bx bx-trending-down'></i>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: animateProgress ? `${currentStats.lowest}%` : '0%',
                backgroundColor: '#f44336'
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-value" style={{ color: '#9c27b0' }}>{currentStats.passRate}%</div>
              <div className="stat-label">Pass Rate</div>
            </div>
            <div className="stat-icon purple-theme">
              <i className='bx bx-check-circle'></i>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: animateProgress ? `${currentStats.passRate}%` : '0%',
                backgroundColor: '#9c27b0'
              }}
            />
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="performance-grid">
        <div className="performance-card">
          <h3 className="text-xl font-semibold mb-4">Monthly Performance</h3>
          <div className="month-stats">
            {monthlyData.map((item, index) => (
              <div className="month-bar" key={index}>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{ 
                      height: animateProgress ? `${item.value}%` : '0%',
                      backgroundColor: '#2196f3'
                    }}
                  />
                </div>
                <span className="month-label">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="performance-card">
          <h3 className="text-xl font-semibold mb-4">Class Statistics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Total Students</span>
                <span className="font-bold">{currentStats.totalStudents}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: animateProgress ? '100%' : '0%',
                    backgroundColor: '#2196f3'
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Median Score</span>
                <span className="font-bold">{currentStats.median}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: animateProgress ? `${currentStats.median}%` : '0%',
                    backgroundColor: '#4caf50'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;