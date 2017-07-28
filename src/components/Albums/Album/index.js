import React from 'react';

import Cover from './Cover';

export default ({ album }) => (
	<a href={album.lastfm_url} className="album" target="_blank">
		<Cover img={album.image} />
	</a>
);