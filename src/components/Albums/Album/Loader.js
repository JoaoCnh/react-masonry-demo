import React from 'react';

import './Loader.css';

export default ({ width, height }) => (
	<div className="placeholder" style={{ width, height }}>
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  </div>
);