import React from 'react';

import logo from '../logo.svg';

export default () => {
	console.log("== RENDER APP HEADER ==");

	return (
		<div className="App-header">
	    <img src={logo} className="App-logo" alt="logo" />
	    <h2>{`Welcome to Masonry Demo`}</h2>
	  </div>
	);
}