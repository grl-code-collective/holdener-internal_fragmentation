import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Graph = ({ sliderValue }) => {
  // Generate the bell curve data points for visual representation only
  const data = Array.from({ length: 1025 }, (_, i) => ({
    x: i,
    y: 100 * Math.exp(-Math.pow(i - 512, 2) / (2 * Math.pow(250, 2))), // Bell curve for visual purposes
  }));

  const graphData = {
    labels: data.map((point) => point.x),
    datasets: [
      {
        label: 'Distribution of Block Utilization',
        data: data.map((point) => point.y),
        borderColor: 'blue',
        borderWidth: 3,
        fill: false,
        tension: 0.4, // Smooth curve for bell shape
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        min: 0,
        max: 1024,
        title: { display: true, text: 'Block Size' },
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
  };

  // Calculate the y-value for visual positioning on the bell curve
  const yValue = 100 * Math.exp(-Math.pow(sliderValue - 512, 2) / (2 * Math.pow(250, 2)));

  // Calculate internal fragmentation percentage based on the linear formula
  const internalFragmentationPercentage = 100 * (1 - sliderValue / 1024);

  return (
    <div className="graph-container" style={{ position: 'relative', width: '80%', margin: '0 auto' }}>
      <Line data={graphData} options={options} />
      {/* Render the dot aligned with the curve for visual purposes */}
      <div
        className="dot"
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          left: `${(sliderValue / 1024) * 100}%`, // Align with x-axis
          top: `${100 - yValue}%`, // Follow the bell curve shape visually
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      {/* Display the internal fragmentation percentage below the graph */}
      <div className="percentage-display" style={{ marginTop: '20px', textAlign: 'center', fontSize: '18px' }}>
        Internal Fragmentation: {Math.round(internalFragmentationPercentage)}%
      </div>
    </div>
  );
};

export default Graph;
