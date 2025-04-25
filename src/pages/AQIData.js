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

let rest_server_ip_address = "192.168.1.76";

const getPMRecommendations = (pmData) => {
  const recommendations = [];
    if (pmData.pm1 < 12) {
      recommendations.push({ type: 'success', message: 'Detected - PM1 levels are Extremely Good. Good Job.' });
    } else if (pmData.pm1 >= 12 && pmData.pm1 < 35) {
      recommendations.push({ type: 'success', message: 'Detected - PM1 levels are Ok.' });
    } else if (pmData.pm1 >= 35 && pmData.pm1 < 55) {
      recommendations.push({ type: 'info', message: 'Detected - PM1 levels are unhealthy for sensitive groups.' });
    } 
    else if (pmData.pm1 >= 55 && pmData.pm1 < 150) {
      recommendations.push({ type: 'warning', message: 'Detected - PM1 levels are High.' });
    } 
    else if (pmData.pm1 >= 150 && pmData.pm1 < 250) {
      recommendations.push({ type: 'warning', message: 'Detected - PM1 levels are High and Unhealthy - Consider Ventilating the Area if Possible or Exit' });
    } 
    else {
      recommendations.push({ type: 'error', message: 'Detected - PM1 Level Are Dangerous. Exit the Area or Attempt to ventilate the Area if Safe.' });
    }
  
    if (pmData.pm2_5 < 12) {
      recommendations.push({ type: 'success', message: 'Detected - PM2.5 levels are Extremely Good. Good Job.' });
    } else if (pmData.pm2_5 >= 12 && pmData.pm2_5 < 35) {
      recommendations.push({ type: 'success', message: 'Detected - PM2.5 levels are Ok.' });
    } else if (pmData.pm2_5 >= 35 && pmData.pm2_5 < 55) {
      recommendations.push({ type: 'info', message: 'Detected - PM2.5 levels are unhealthy for sensitive groups.' });
    } 
    else if (pmData.pm2_5 >= 55 && pmData.pm2_5 < 150) {
      recommendations.push({ type: 'warning', message: 'Detected - PM2.5 levels are High.' });
    } 
    else if (pmData.pm2_5 >= 150 && pmData.pm2_5 < 250) {
      recommendations.push({ type: 'warning', message: 'Detected - PM2.5 levels are High and Unhealthy - Consider Ventilating the Area if Possible or Exit' });
    } 
    else {
      recommendations.push({ type: 'error', message: 'Detected - PM2.5 Level Are Dangerous. Exit the Area or Attempt to ventilate the Area if Safe.' });
    }
  
    if (pmData.pm10 < 12) {
      recommendations.push({ type: 'success', message: 'Detected - PM10 levels are Extremely Good. Good Job.' });
    } else if (pmData.pm10 >= 12 && pmData.pm10 < 35) {
      recommendations.push({ type: 'success', message: 'Detected - PM10 levels are Ok.' });
    } else if (pmData.pm10 >= 35 && pmData.pm10 < 55) {
      recommendations.push({ type: 'info', message: 'Detected - PM10 levels are unhealthy for sensitive groups.' });
    } 
    else if (pmData.pm10 >= 55 && pmData.pm10 < 150) {
      recommendations.push({ type: 'warning', message: 'Detected - PM10 levels are High.' });
    } 
    else if (pmData.pm10 >= 150 && pmData.pm10 < 250) {
      recommendations.push({ type: 'warning', message: 'Detected - PM10 levels are High and Unhealthy -Consider Ventilating the Area if Possible or Exit' });
    } 
    else {
      recommendations.push({ type: 'error', message: 'Detected - PM10 Levels Are Dangerous. Exit the Area or Attempt to ventilate the Area if Safe.' });
    }
  
  return recommendations;
};

const getCO2Recommendations = (co2Data) => {
  const recommendations = [];
  
  if (co2Data.co2_ppm < 500) {
    recommendations.push({ type: 'success', message: 'Detected - CO2 levels are good. Ventilation is Good.' });
  } else if (co2Data.co2_ppm > 500 && co2Data.co2_ppm < 1000) {
    recommendations.push({ type: 'success', message: 'Detected - CO2 levels are ok. Little on the High Side. Consider increasing ventilation such as openeing a window.'});
  } else if (co2Data.co2_ppm > 1000 && co2Data.co2_ppm < 2000) {
    recommendations.push({ type: 'info', message: 'Detected - CO2 levels are High. Consider increasing ventilation such as openeing a Window or Door.' });
  } else if (co2Data.co2_ppm > 2000 && co2Data.co2_ppm < 5000) {
    recommendations.push({ type: 'warning', message: 'Detected - CO2 levels are High. Increase Ventilation, Introduce Carbon Purifiers & Open Windows if Possible. - May lead to headaches and reduced concentration; unhealthy for long-term exposure' });
  } else {
    recommendations.push({ type: 'error', message: 'Detected - CO2 levels are Dangerously high. Increase ventilation immediately - Can Cause Dizziness or Respiratory Conditions if Prolonged Exposure.' });
  }
  
  return recommendations;
};

const particulateMatterProducts = (pmData) => {
  const products = ["Air Purifiers", "Humidifiers"];
  const plants = ["Spider Plant", "Snake Plant", "Peace Lily", "Aloe Vera", "English Ivy"];
  
  let severity = "low";
  
  if (pmData.pm2_5 > 55 || pmData.pm10 > 55 || pmData.pm1 > 55) {
    severity = "high";
  } else if (pmData.pm2_5 > 12 || pmData.pm10 > 12 || pmData.pm1 > 12) {
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
  
  if (co2Data.co2_ppm >= 2000) {
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
    const data = (currentData, dataType) => {
      const timestamp = new Date(currentData[0]?.time || new Date().toISOString());
      
      return Array(10).fill().map((_, i) => {
        const date = new Date(timestamp);
        date.setMinutes(date.getMinutes() - (9-i) * 5);
        
        const timeStr = date.toLocaleTimeString();
        
        if (dataType === 'pm') {
          return {
            time: timeStr,
            pm1: currentData[0]?.value * (0.8 + Math.random() * 0.4),
            pm2_5: currentData[2]?.value * (0.8 + Math.random() * 0.4),
            pm10: currentData[1]?.value * (0.8 + Math.random() * 0.4)
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

          const pmHistoricalData = data(pmResponseData, 'pm');
          setPmHistorical(pmHistoricalData);
        }
        
        const co2Response = await axios.get('http://' + rest_server_ip_address + ':8000/aqi_co2_data');
        const co2ResponseData = co2Response.data;
        
        if (co2ResponseData && co2ResponseData.length >= 2) {
          const co2_ppm = parseFloat(co2ResponseData[0]?.value) || 0;
          const co2_percent = parseFloat(co2ResponseData[1]?.value) || 0;
          
          setCo2Data({ co2_ppm, co2_percent });
          
          const co2HistoricalData = data(co2ResponseData, 'co2');
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

      <div
  style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '40px',
  }}
>
    <div style={{ flex: 1 }}>
      <h3 style={{ textAlign: 'center' }}>Particulate Matter Time Series</h3>
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
    </div>
    <div style={{ flex: 2, maxWidth: '500px' }}>
      <h3 style={{ textAlign: 'center' }}>PM Results</h3>
      {pmRecommendations.map((rec, i) => (
        <Alert
          key={i}
          message={rec.message}
          type={rec.type}
          showIcon
          style={{ marginBottom: '10px' }}
        />
      ))}
    </div>
  </div>

  <div
  style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '40px',
  }}
  >

    <div style={{ flex: 1 }}>
      <h3 style={{ textAlign: 'center' }}>CO₂ Time Series</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={co2Historical}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="co2_ppm" stroke="#82ca9d" name="CO₂ (ppm)"/>

        </LineChart>
      </ResponsiveContainer>
    </div>

    <div style={{ flex: 2, maxWidth: '500px' }}>
      <h3 style={{ textAlign: 'center' }}>CO₂ Recommendations</h3>
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

    </div>
  );
};

export default ParticulateMatter;