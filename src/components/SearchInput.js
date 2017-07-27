import React from 'react';
import './SearchInput.css';

export default ({ onChange }) => {
	console.log('== RENDER SEARCH_INPUT ==');

	const _onChange = (event) => {
		onChange(event.target.value);
	};

	return (
		<div className="container">
			<div className="group">
	      <input type="text" onChange={_onChange} required />
	      <span className="highlight"></span>
	      <span className="bar"></span>
	      <label>{`LAST.FM Username`}</label>
	    </div>
	  </div>
	);
}