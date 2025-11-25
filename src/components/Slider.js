// src/components/Slider.js
import React from 'react';
import './Slider.css';

const Slider = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <input
      type="range"
      min="0"
      max="1024"
      value={value}
      onChange={handleChange}
      className="slider"
    />
  );
};

export default Slider;
