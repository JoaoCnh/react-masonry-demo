import React from 'react';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';

import Album from './Album';

import './Albums.css';

export default ({ albums, isLoading, page, totalPages, loadMore }) => {
	console.log("== RENDER ALBUMS ==");

	return (
		<div style={{height: 600, overflowY: 'scroll'}}>
			<InfiniteScroll pageStart={page - 1} loadMore={loadMore}
				hasMore={page < totalPages} loader={<span>...</span>}
				useWindow={false} threshold={150}>
				<Masonry className="Albums">
					{albums.map((album, index) => (
						<Album key={index} album={album} />
					))}
				</Masonry>
			</InfiniteScroll>
		</div>
	);
}