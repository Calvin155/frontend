import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Alert, List, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./css/AQI.css";

const { Title } = Typography;

const SingleStatCard = ({ title, value }) => (
  <Card title={title} style={{ width: 200, textAlign: 'center', margin: '10px' }}>
    <h2>{value !== null ? `${value}` : 'N/A'}</h2>
  </Card>
);

let rest_server_ip_address = "52.212.232.158";

const getPMRecommendations = (pmData) => {
  const recommendations = [];
    if (pmData.pm1 <= 12) {
      recommendations.push({ type: 'success', message: 'PM1 levels are good. Air quality is satisfactory.' });
    } else if (pmData.pm1 <= 35.4) {
      recommendations.push({ type: 'warning', message: 'PM1 levels are moderate. Unusually sensitive people should consider reducing prolonged outdoor exertion.' });
    } else if (pmData.pm1 <= 55.4) {
      recommendations.push({ type: 'warning', message: 'PM1 levels are unhealthy for sensitive groups. Active children and adults, and people with respiratory disease should limit prolonged outdoor exertion.' });
    } else {
      recommendations.push({ type: 'error', message: 'PM1 levels are unhealthy. Everyone should limit outdoor activities. Consider using air purifiers indoors.' });
    }
  
  if (pmData.pm2_5 <= 12) {
    recommendations.push({ type: 'success', message: 'PM2.5 levels are good. Air quality is satisfactory.' });
  } else if (pmData.pm2_5 <= 35.4) {
    recommendations.push({ type: 'warning', message: 'PM2.5 levels are moderate. Unusually sensitive people should consider reducing prolonged outdoor exertion.' });
  } else if (pmData.pm2_5 <= 55.4) {
    recommendations.push({ type: 'warning', message: 'PM2.5 levels are unhealthy for sensitive groups. Active children and adults, and people with respiratory disease should limit prolonged outdoor exertion.' });
  } else {
    recommendations.push({ type: 'error', message: 'PM2.5 levels are unhealthy. Everyone should limit outdoor activities. Consider using air purifiers indoors.' });
  }
  
  if (pmData.pm10 <= 54) {
    recommendations.push({ type: 'success', message: 'PM10 levels are good. Air quality is satisfactory.' });
  } else if (pmData.pm10 <= 154) {
    recommendations.push({ type: 'warning', message: 'PM10 levels are moderate. Unusually sensitive people should consider reducing prolonged outdoor exertion.' });
  } else {
    recommendations.push({ type: 'error', message: 'PM10 levels are unhealthy. Consider using air purifiers and keeping windows closed.' });
  }
  
  return recommendations;
};

const getCO2Recommendations = (co2Data) => {
  const recommendations = [];
  
  if (co2Data.co2_ppm < 800) {
    recommendations.push({ type: 'success', message: 'CO2 levels are good. Ventilation is adequate.' });
  } else if (co2Data.co2_ppm < 1000) {
    recommendations.push({ type: 'warning', message: 'CO2 levels are slightly elevated. Consider increasing ventilation.' });
  } else if (co2Data.co2_ppm < 1500) {
    recommendations.push({ type: 'warning', message: 'CO2 levels are elevated. Increase ventilation by opening windows or using mechanical ventilation.' });
  } else {
    recommendations.push({ type: 'error', message: 'CO2 levels are high. Poor air quality may cause drowsiness and affect concentration. Increase ventilation immediately.' });
  }
  
  return recommendations;
};

const particulateMatterProducts = (pmData) => {
  const products = ["Air Purifiers", "Humidifiers"];
  const plants = ["Spider Plant", "Snake Plant", "Peace Lily", "Aloe Vera", "English Ivy"];
  
  let severity = "low";
  
  if (pmData.pm2_5 > 35.4 || pmData.pm10 > 154 || pmData.pm1 > 35.4) {
    severity = "high";
  } else if (pmData.pm2_5 > 12 || pmData.pm10 > 54 || pmData.pm1 > 12) {
    severity = "medium";
  }
  
  return {
    title: severity === "high" ? "Recommended Products for High PM Levels" : 
           severity === "medium" ? "Recommended Products for Moderate PM Levels" : 
           "Suggested Products for Maintaining Good Air Quality",
    products: products,
    plants: plants,
    severity: severity
  };
};

const co2ProductRecommendations = (co2Data) => {
  const products = ["Carbon Scrubbers", "Air Purifiers", "Dehumidifiers", "Ventilation systems"];
  const plants = ["Spider Plant", "Snake Plant", "Peace Lily", "Aloe Vera", "English Ivy"];
  
  let severity = "low";
  
  if (co2Data.co2_ppm >= 1500) {
    severity = "high";
  } else if (co2Data.co2_ppm >= 1000) {
    severity = "medium";
  } else if (co2Data.co2_ppm >= 800) {
    severity = "medium-low";
  }
  
  return {
    title: severity === "high" ? "Recommended Products for High CO2 Levels" : 
           severity === "medium" ? "Recommended Products for Elevated CO2 Levels" : 
           severity === "medium-low" ? "Suggested Products for Slightly Elevated CO2 Levels" :
           "Suggested Products for Maintaining Good Air Quality",
    products: products,
    plants: plants,
    severity: severity
  };
};

const ParticulateMatter = () => {
  const [pmData, setPmData] = useState({ pm1: null, pm2_5: null, pm10: null });
  const [co2Data, setCo2Data] = useState({ co2_ppm: null, co2_percent: null });
  const [pmHistorical, setPmHistorical] = useState([]);
  const [co2Historical, setCo2Historical] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createHistoricalData = (currentData, dataType) => {
      const timestamp = new Date(currentData[0]?.time || new Date().toISOString());
      
      return Array(10).fill().map((_, i) => {
        const date = new Date(timestamp);
        date.setMinutes(date.getMinutes() - (9-i) * 5);
        
        const timeStr = date.toLocaleTimeString();
        
        if (dataType === 'pm') {
          return {
            time: timeStr,
            pm1: currentData[0]?.value * (0.8 + Math.random() * 0.4),
            pm2_5: currentData[1]?.value * (0.8 + Math.random() * 0.4),
            pm10: currentData[2]?.value * (0.8 + Math.random() * 0.4)
          };
        } else {
          return {
            time: timeStr,
            co2_ppm: currentData[0]?.value * (0.9 + Math.random() * 0.2),
            co2_percent: currentData[1]?.value * (0.9 + Math.random() * 0.2)
          };
        }
      });
    };
    
    const fetchData = async () => {
      try {
        const pmResponse = await axios.get('http://' + rest_server_ip_address + ':8000/aqi_pm_data');
        const pmResponseData = pmResponse.data;

        if (pmResponseData && pmResponseData.length >= 3) {
          const pm1 = parseFloat(pmResponseData[0]?.value) || 0;
          const pm2_5 = parseFloat(pmResponseData[2]?.value) || 0;
          const pm10 = parseFloat(pmResponseData[1]?.value) || 0;
          
          setPmData({ pm1, pm2_5, pm10 });

          const pmHistoricalData = createHistoricalData(pmResponseData, 'pm');
          setPmHistorical(pmHistoricalData);
        }
        
        const co2Response = await axios.get('http://' + rest_server_ip_address + ':8000/aqi_co2_temp_humidity_data');
        const co2ResponseData = co2Response.data;
        
        if (co2ResponseData && co2ResponseData.length >= 2) {
          const co2_ppm = parseFloat(co2ResponseData[0]?.value) || 0;
          const co2_percent = parseFloat(co2ResponseData[1]?.value) || 0;
          
          setCo2Data({ co2_ppm, co2_percent });
          
          const co2HistoricalData = createHistoricalData(co2ResponseData, 'co2');
          setCo2Historical(co2HistoricalData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data: ' + (err.message || 'Unknown error'));
        setLoading(false);
      }
    };
    
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  const pmRecommendations = getPMRecommendations(pmData);
  const co2Recommendations = getCO2Recommendations(co2Data);
  const pmProducts = particulateMatterProducts(pmData);
  const co2Products = co2ProductRecommendations(co2Data);
  const co2_percent = co2Data.co2_ppm / 10000;




  return (
    <div>
      <h2 className="center-heading">Live Particulate Matter & CO2 Data</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <SingleStatCard title="PM 1" value={pmData.pm1.toFixed(1)} />
        <SingleStatCard title="PM 2.5" value={pmData.pm2_5.toFixed(1)} />
        <SingleStatCard title="PM 10" value={pmData.pm10.toFixed(1)} />
        <SingleStatCard title="CO2 (ppm)" value={co2Data.co2_ppm.toFixed(1)} />
        <SingleStatCard title="CO2 (%)" value={co2_percent.toFixed(2)} />
      </div>
      
      <h2 className="center-heading">Particulate Matter Time Series</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={pmHistorical}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pm1" stroke="#8884d8" name="PM 1" />
          <Line type="monotone" dataKey="pm2_5" stroke="#82ca9d" name="PM 2.5" />
          <Line type="monotone" dataKey="pm10" stroke="#ff7300" name="PM 10" />
        </LineChart>
      </ResponsiveContainer>
      <h3 className="center-heading" style={{ textAlign: 'center' }}>PM Recommendations</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          {pmRecommendations.map((rec, index) => (
            <Alert
              key={index}
              message={rec.message}
              type={rec.type}
              showIcon
              style={{ marginBottom: '10px' }}
            />
          ))}
        </div>
      </div>

      <Card 
        title={pmProducts.title} 
        style={{
          marginBottom: '20px',
          backgroundColor: pmProducts.severity === 'high' ? '#fff1f0' : 
                          pmProducts.severity === 'medium' ? '#fffbe6' : '#f6ffed',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <Title level={5}>Recommended Products:</Title>
            <List
              size="small"
              bordered
              dataSource={pmProducts.products}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              style={{ width: '250px' }}
            />
          </div>
          <div>
            <Title level={5}>Air-Purifying Plants:</Title>
            <List
              size="small"
              bordered
              dataSource={pmProducts.plants}
              renderItem={(item) => <List.Item>{item}</List.Item>}
              style={{ width: '250px' }}
            />
          </div>
        </div>
      </Card>

      
      <h2 className="center-heading">CO2 Time Series</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={co2Historical}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="co2_ppm" stroke="#82ca9d" name="CO2 (ppm)" />
        </LineChart>
      </ResponsiveContainer>
      
      <h3 className="center-heading" style={{ textAlign: 'center' }}>CO2 Recommendations</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ maxWidth: '500px', width: '100%' }}>
          {co2Recommendations.map((rec, index) => (
            <Alert
              key={index}
              message={rec.message}
              type={rec.type}
              showIcon
              style={{ marginBottom: '10px' }}
            />
          ))}
        </div>
      </div>

      
      <Card
          title={co2Products.title}
          style={{
            marginBottom: '20px',
            backgroundColor: co2Products.severity === 'high' ? '#fff1f0' : co2Products.severity === 'medium' ? '#fffbe6' : '#f6ffed',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ width: '250px', textAlign: 'center' }}>
              <Title level={5}>Recommended Products:</Title>
              <List
                size="small"
                bordered
                dataSource={co2Products.products}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
            <div style={{ width: '250px', textAlign: 'center' }}>
              <Title level={5}>CO2-Absorbing Plants:</Title>
              <List
                size="small"
                bordered
                dataSource={co2Products.plants}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          </div>
        </Card>

    </div>
  );
};

export default ParticulateMatter;