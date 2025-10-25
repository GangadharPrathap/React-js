import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {
  // Sample data for time allocation (in hours per day)
  const timeAllocationData = {
    series: [8, 7, 3, 2, 4], // Study, Sleep, Leisure, Meals, Other
    options: {
      chart: {
        type: 'pie',
        background: '#1e1e1e',
      },
      labels: ['Study', 'Sleep', 'Leisure', 'Meals', 'Other'],
      colors: ['#00D4FF', '#FF6B6B', '#4ECDC4', '#FFD93D', '#A8E6CF'],
      title: {
        text: 'Daily Time Allocation',
        style: {
          color: '#ffffff',
          fontSize: '20px',
        },
      },
      legend: {
        labels: {
          colors: '#ffffff',
        },
      },
      theme: {
        mode: 'dark',
      },
    },
  };

  // Sample data for expenditure categories (in USD)
  const expenditureCategoriesData = {
    series: [{
      data: [50, 30, 20, 15, 10], // Food, Transport, Entertainment, Books, Other
    }],
    options: {
      chart: {
        type: 'bar',
        background: '#1e1e1e',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Food', 'Transport', 'Entertainment', 'Books', 'Other'],
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      colors: ['#00D4FF'],
      title: {
        text: 'Daily Expenditure by Category',
        style: {
          color: '#ffffff',
          fontSize: '20px',
        },
      },
      theme: {
        mode: 'dark',
      },
    },
  };

  // Sample data for expenditure trends over 7 days
  const expenditureTrendsData = {
    series: [{
      name: 'Total Expenditure',
      data: [120, 110, 130, 100, 140, 125, 135],
    }],
    options: {
      chart: {
        type: 'line',
        background: '#1e1e1e',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      colors: ['#FF6B6B'],
      title: {
        text: 'Weekly Expenditure Trends',
        style: {
          color: '#ffffff',
          fontSize: '20px',
        },
      },
      theme: {
        mode: 'dark',
      },
    },
  };

  // Sample data for activity distribution (area chart)
  const activityDistributionData = {
    series: [{
      name: 'Hours',
      data: [8, 7, 3, 2, 4],
    }],
    options: {
      chart: {
        type: 'area',
        background: '#1e1e1e',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Study', 'Sleep', 'Leisure', 'Meals', 'Other'],
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      colors: ['#4ECDC4'],
      title: {
        text: 'Activity Distribution',
        style: {
          color: '#ffffff',
          fontSize: '20px',
        },
      },
      theme: {
        mode: 'dark',
      },
    },
  };

  return (
    <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', padding: '20px', color: '#ffffff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Student Daily Life & Expenditure Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
          <ReactApexChart options={timeAllocationData.options} series={timeAllocationData.series} type="pie" height={350} />
        </div>
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
          <ReactApexChart options={expenditureCategoriesData.options} series={expenditureCategoriesData.series} type="bar" height={350} />
        </div>
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
          <ReactApexChart options={expenditureTrendsData.options} series={expenditureTrendsData.series} type="line" height={350} />
        </div>
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
          <ReactApexChart options={activityDistributionData.options} series={activityDistributionData.series} type="area" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
