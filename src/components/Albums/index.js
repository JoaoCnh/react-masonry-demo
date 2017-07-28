import React from 'react';
import {
	Masonry,
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
} from 'react-virtualized';

import Album from './Album';

import './Albums.css';

const columnCount = 6;
const defaultHeight = 300;
const defaultWidth = 300;
const fullWidth = (defaultWidth * columnCount) + 60;

export default ({ albums, isLoading, page, totalPages, loadMore }) => {
	const cache = new CellMeasurerCache({
		defaultHeight,
		defaultWidth,
		fixedWidth: true,
	});

	const cellPositioner = createMasonryCellPositioner({
		cellMeasurerCache: cache,
		columnCount,
		columnWidth: defaultWidth,
		spacer: 10,
	});
	
	const cellRenderer = ({ index, key, parent, style }) => {
		const album = albums[index];

		return (
			<CellMeasurer cache={cache} index={index} key={key} parent={parent}>
				<Album style={style} album={album} />
			</CellMeasurer>
		);
	};

	const listenScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
		const infiniteBarrier = Math.abs(scrollHeight - clientHeight);
		const isFinalPage = page === totalPages;
		const shouldLoadMore = scrollTop >= infiniteBarrier && !isFinalPage;

		if (!shouldLoadMore) { return; } 

		return loadMore();
	};

	return (
		<div className="Albums-Container">
			{albums.length > 0 ?
				<Masonry cellCount={albums.length} cellMeasurerCache={cache}
					cellPositioner={cellPositioner} cellRenderer={cellRenderer}
					onScroll={listenScroll}
					height={700} width={fullWidth} />
				: <div />
			}
		</div>
	);
}