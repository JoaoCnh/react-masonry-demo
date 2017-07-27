const API_KEY = 'YOUR API KEY';
const ROOT_URL = 'http://ws.audioscrobbler.com/2.0';

export const getTopAlbums = async (userName, page = 1) => {
	const res = await fetch(`${ROOT_URL}?method=user.gettopalbums&user=${userName}&api_key=${API_KEY}&format=json&page=${page}`);
	const json = await res.json();

	const albums = json.topalbums.album.map((album) => {
		return {
			name: album.name,
			lastfm_url: album.url,
			artist: album.artist,
			image: album.image[3]['#text'],
		};
	});

	const pageInfo = {
		page: parseInt(json.topalbums['@attr'].page, 10),
		totalPages: parseInt(json.topalbums['@attr'].totalPages, 10),
	};

	return { albums, pageInfo };
};