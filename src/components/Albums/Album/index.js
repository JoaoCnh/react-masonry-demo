import React from 'react';

import Cover from './Cover';

export default ({ album }) => (
	<div className="Album-Container">
		<a href={album.lastfm_url} className="Album" target="_blank">
			<Cover img={album.image} />
			<div className="Album-Info">
				<h1>{album.name}</h1>
				<h2>{album.artist.name}</h2>
			</div>
		</a>
	</div>
);