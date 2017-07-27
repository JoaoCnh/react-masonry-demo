import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';

import Albums from './components/Albums';
import AppHeader from './components/AppHeader';
import SearchInput from './components/SearchInput';

import './App.css';

import { getTopAlbums } from './api/lastfm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isLoading: false,
      albums: [],
      page: 1,
      totalPages: 1,
    };

    this._userNameChanged = debounce(500, this._userNameChanged);
  }

  async _userNameChanged(userName) {
    this.setState({
      isLoading: true,
    });

    if (!userName) {
      return this.setState({
        userName: '',
        isLoading: false,
        albums: [],
      });
    }

    const { albums, pageInfo } = await getTopAlbums(userName, this.state.page);

    this.setState({
      userName: userName,
      albums: albums,
      page: pageInfo.page,
      totalPages: pageInfo.totalPages,
    });
  }

  async _loadMore() {
    const { albums, pageInfo } = await getTopAlbums(this.state.userName, this.state.page + 1);

    this.setState({
      albums: this.state.albums.concat(albums),
      page: pageInfo.page,
      totalPages: pageInfo.totalPages,
    });
  }

  render() {
    console.log('== RENDER APP ==');

    return (
      <div className="App">
        <AppHeader />
        <div className="App-body">
          <SearchInput onChange={this._userNameChanged.bind(this)} />
          <Albums albums={this.state.albums} isLoading={this.state.isLoading}
            page={this.state.page} totalPages={this.state.totalPages}
            loadMore={this._loadMore.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
