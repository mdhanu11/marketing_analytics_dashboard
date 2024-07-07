// src/BarChart.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const BarChart = () => {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  };

  if (!data) {
    return (
      <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
    );
  }

  const days = data.map((row) => row['Day']);
  const cost = data.map((row) => parseFloat(row['Cost']));
  const clicks = data.map((row) => parseFloat(row['Clicks']));
  const impressions = data.map((row) => parseFloat(row['Impr.']));

  return (
    <div>
      <h1>Cost, Clicks, and Impressions Over Days</h1>
      <Plot
        data={[
          {
            x: days,
            y: cost,
            type: 'bar',
            name: 'Cost',
            marker: { color: 'blue' },
          },
          {
            x: days,
            y: clicks,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Clicks',
            line: { color: 'magenta' },
            yaxis: 'y2',
          },
          {
            x: days,
            y: impressions,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Impressions',
            line: { color: 'green' },
            yaxis: 'y3',
          },
        ]}
        layout={{
          title: 'Cost, Clicks, and Impressions Over Days',
          xaxis: { title: 'Day' },
          yaxis: {
            title: 'Cost',
            titlefont: { color: 'blue' },
            tickfont: { color: 'blue' },
          },
          yaxis2: {
            title: 'Clicks',
            titlefont: { color: 'magenta' },
            tickfont: { color: 'magenta' },
            overlaying: 'y',
            side: 'right',
          },
          yaxis3: {
            title: 'Impressions',
            titlefont: { color: 'green' },
            tickfont: { color: 'green' },
            overlaying: 'y',
            side: 'right',
          },
          margin: { l: 40, b: 40, t: 40, r: 40 },
          hovermode: 'closest',
          legend: { x: 0, y: 1 },
        }}
      />
    </div>
  );
};

export default BarChart;
