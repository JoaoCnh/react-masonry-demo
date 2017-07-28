import React from 'react';
import LazyLoad from 'react-lazyload';

import Loader from './Loader';

export default ({ img }) => (
	<LazyLoad height={img.height} offset={100}
		placeholder={<Loader width={img.width} height={img.height} />} once resize overflow>
		<img src={img.url} alt={img.alt} width={img.width} height={img.height} />
	</LazyLoad>
);