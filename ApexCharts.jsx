import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import ReactApexChart from 'react-apexcharts';

const DashboardWithExcelImport = () => {
  const [rawExcelData, setRawExcelData] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);
  const [expenditureData, setExpenditureData] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setRawExcelData(jsonData);
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    if (!rawExcelData) return;

    // Candlestick data (assuming columns: Date, Open, High, Low, Close)
    const candlestick = rawExcelData.map((row) => {
      const timestamp = new Date(row['Date']).getTime();
      const ohlc = [row['Open'], row['High'], row['Low'], row['Close']];
      return { x: timestamp, y: ohlc };
    }).filter(d => d.x && d.y.every(v => typeof v === 'number'));
    setCandlestickData(candlestick);

    // Expenditure over time (assuming column: Expenditure)
    const expenditures = rawExcelData.map((row) => ({
      x: new Date(row['Date']).getTime(),
      y: row['Expenditure'] || 0,
    })).filter(d => d.x && typeof d.y === 'number');
    setExpenditureData(expenditures);

    // Category pie chart (assuming column: Category)
    const categories = {};
    rawExcelData.forEach((row) => {
      const cat = row['Category'];
      if (cat) {
        categories[cat] = (categories[cat] || 0) + (row['Expenditure'] || 0);
      }
    });
    setCategoryData(categories);

    // Activity bar chart (assuming columns: Activity, Hours)
    const activities = rawExcelData.map((row) => ({
      activity: row['Activity'],
      hours: row['Hours'] || 0,
    })).filter(d => d.activity && typeof d.hours === 'number');
    setActivityData(activities);

    // Trend area chart (cumulative expenditure)
    let cumulative = 0;
    const trends = rawExcelData.map((row) => {
      cumulative += row['Expenditure'] || 0;
      return {
        x: new Date(row['Date']).getTime(),
        y: cumulative,
      };
    }).filter(d => d.x);
    setTrendData(trends);
  }, [rawExcelData]);

  const candlestickOptions = {
    chart: { type: 'candlestick', height: 350, background: '#1e1e1e' },
    title: { text: 'Financial Data - Candlestick Chart', align: 'left', style: { color: '#ffffff' } },
    xaxis: { type: 'datetime', labels: { style: { colors: '#ffffff' } } },
    yaxis: { tooltip: { enabled: true }, labels: { style: { colors: '#ffffff' } } },
    theme: { mode: 'dark' },
  };

  const expenditureOptions = {
    chart: { type: 'line', height: 350, background: '#1e1e1e' },
    title: { text: 'Daily Expenditure Trends', align: 'left', style: { color: '#ffffff' } },
    xaxis: { type: 'datetime', labels: { style: { colors: '#ffffff' } } },
    yaxis: { labels: { style: { colors: '#ffffff' } } },
    colors: ['#00D4FF'],
    theme: { mode: 'dark' },
  };

  const categoryOptions = {
    chart: { type: 'pie', height: 350, background: '#1e1e1e' },
    title: { text: 'Expenditure by Category', align: 'left', style: { color: '#ffffff' } },
    labels: Object.keys(categoryData),
    colors: ['#00D4FF', '#FF6B6B', '#4ECDC4', '#FFD93D', '#A8E6CF'],
    legend: { labels: { colors: '#ffffff' } },
    theme: { mode: 'dark' },
  };

  const activityOptions = {
    chart: { type: 'bar', height: 350, background: '#1e1e1e' },
    title: { text: 'Daily Activity Hours', align: 'left', style: { color: '#ffffff' } },
    xaxis: { categories: activityData.map(d => d.activity), labels: { style: { colors: '#ffffff' } } },
    yaxis: { labels: { style: { colors: '#ffffff' } } },
    colors: ['#FF6B6B'],
    theme: { mode: 'dark' },
  };

  const trendOptions = {
    chart: { type: 'area', height: 350, background: '#1e1e1e' },
    title: { text: 'Cumulative Expenditure Trend', align: 'left', style: { color: '#ffffff' } },
    xaxis: { type: 'datetime', labels: { style: { colors: '#ffffff' } } },
    yaxis: { labels: { style: { colors: '#ffffff' } } },
    colors: ['#4ECDC4'],
    theme: { mode: 'dark' },
  };

  return (
    <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', padding: '20px', color: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Student Financial & Daily Life Analysis Dashboard</h1>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Upload Excel File with Student Data</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#2a2a2a',
            color: '#ffffff'
          }}
        />
        {loading && <p>Loading data...</p>}
      </div>

      {candlestickData.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
            <ReactApexChart
              options={candlestickOptions}
              series={[{ data: candlestickData }]}
              type="candlestick"
              height={350}
            />
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
            <ReactApexChart
              options={expenditureOptions}
              series={[{ name: 'Expenditure', data: expenditureData }]}
              type="line"
              height={350}
            />
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
            <ReactApexChart
              options={categoryOptions}
              series={Object.values(categoryData)}
              type="pie"
              height={350}
            />
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
            <ReactApexChart
              options={activityOptions}
              series={[{ name: 'Hours', data: activityData.map(d => d.hours) }]}
              type="bar"
              height={350}
            />
          </div>
          <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px' }}>
            <ReactApexChart
              options={trendOptions}
              series={[{ name: 'Cumulative', data: trendData }]}
              type="area"
              height={350}
            />
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Please upload a file to see the charts. Ensure your Excel has columns: Date, Open, High, Low, Close, Expenditure, Category, Activity, Hours.</p>
      )}
    </div>
  );
};

export default DashboardWithExcelImport;
