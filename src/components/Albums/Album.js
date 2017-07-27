import React from 'react';

export default ({ album }) => (
	<a href={album.lastfm_url} className="album" target="_blank">
		<img src={album.image} alt={album.name} />
	</a>
);