import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import "./css/AQI.css";

const SingleStatCard = ({ title, value }) => (
  <Card title={title} style={{ width: 200, textAlign: 'center', margin: '10px' }}>
    <h2>{value !== null ? `${value} µg/m³` : 'N/A'}</h2>
  </Card>
);

const ParticulateMatter = () => {
  const [pmData, setPmData] = useState({ pm1: null, pm2_5: null, pm10: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPMData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/particulate-matter/get-PM-Data');
        const data = response.data; // Assuming data is [1.8, 3.8, 2.8]
        setPmData({ pm1: data[0], pm2_5: data[1], pm10: data[2] });
        setLoading(false);
      } catch (err) {
        setError('Error fetching PM data');
        setLoading(false);
      }
    };

    fetchPMData();
  }, []);

  if (loading) {
    return <div>Loading PM data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Particulate Matter Data</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <SingleStatCard title="PM 1" value={pmData.pm1} />
        <SingleStatCard title="PM 2.5" value={pmData.pm2_5} />
        <SingleStatCard title="PM 10" value={pmData.pm10} />
      </div>
    </div>
  );
};

export default ParticulateMatter;
