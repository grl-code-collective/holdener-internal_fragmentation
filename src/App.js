// src/App.js
import React, { useState } from 'react';
import Graph from './components/Graph';
import Slider from './components/Slider';
import './styles/App.css';

const App = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const getFragmentationMessage = (value) => {
    if (value === 0) return 'Exactly zero. Don’t need the block!';
    if (value === 512) return 'Half-full block. Common usage!';
    if (value >= 900) return 'Almost full. Efficient usage!';
  
    // For other values, show block size dynamically
    return `Block size at ${value} bytes. Moderate usage.`;
  };
  
  

  return (
    <div className="app-container">
      <h1>Interactive Fragmentation Graph</h1>
      <Graph sliderValue={sliderValue} />
      <Slider value={sliderValue} onChange={handleSliderChange} />
      <div className="message">{getFragmentationMessage(sliderValue)}</div>
    </div>
  );
};

export default App;
