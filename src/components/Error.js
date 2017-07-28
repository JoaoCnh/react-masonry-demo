import React from 'react';

export default ({ error }) => (
	<div className="App-error">
		<h2>{`Oops!`}</h2>
		<p>{error}</p>
	</div>
);