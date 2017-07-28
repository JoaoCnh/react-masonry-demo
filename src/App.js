import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';

import Error from './components/Error';
import Albums from './components/Albums';
import AppHeader from './components/AppHeader';
import SearchInput from './components/SearchInput';

import './App.css';

import { getTopAlbums } from './api/lastfm';

const initialState = {
  userName: '',
  isLoading: false,
  albums: [],
  page: 1,
  error: null,
  totalPages: 1,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this._userNameChanged = debounce(500, this._userNameChanged);
  }

  _clearSearch() {
    this.setState(initialState);
  }

  async _userNameChanged(userName) {
    if (!userName) {
      return this._clearSearch();
    }

    this.setState({
      isLoading: true,
    });

    const { albums, pageInfo, error } = await getTopAlbums(userName, this.state.page);
    const { page, totalPages } = pageInfo;

    this.setState({
      isLoading: false,
      page,
      error,
      albums,
      userName,
      totalPages,
    });
  }

  async _loadMore() {
    const { albums, pageInfo, error } = await getTopAlbums(this.state.userName, this.state.page + 1);
    const { page, totalPages } = pageInfo;

    this.setState({
      page,
      error,
      totalPages,
      albums: this.state.albums.concat(albums),
    });
  }

  render() {
    const body = this.state.error ? <Error error={this.state.error} /> :
      (<Albums albums={this.state.albums} isLoading={this.state.isLoading}
        page={this.state.page} totalPages={this.state.totalPages}
        loadMore={this._loadMore.bind(this)} />);

    return (
      <div className="App">
        <AppHeader />
        <div className="App-body">
          <SearchInput isLoading={this.state.isLoading}
            onChange={this._userNameChanged.bind(this)} />
          {body}
        </div>
      </div>
    );
  }
}

export default App;
