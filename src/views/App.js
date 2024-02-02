import '../style/App.scss';
import React, { Component } from 'react';
import { ShowSearchResult, YoutubeCloneApp } from './Youtube-App';


class App extends Component {
  state = {
    searchTerm: '',
    videos: [],
    loading: false,
    error: '',
  };

  fetchVideos = async () => {
    const { searchTerm } = this.state;
    const API_KEY = 'AIzaSyDqqUYo-sxHlLbWUmrF3I8zTdswuRVpIKw';
    try {
      this.setState({ loading: true, error: '' });

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      this.setState({ videos: data.items, loading: false });
    } catch (error) {
      this.setState({ error: 'Error fetching videos', loading: false });
    }
  };


  handleSearch = () => {
    const { searchTerm } = this.state;

    if (searchTerm.trim().length >= 1) {
      this.fetchVideos();
    }
  };

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    const { videos, loading, error } = this.state;

    return (
      <div className="App">
        <YoutubeCloneApp
          searchTerm={this.state.searchTerm}
          onSearch={this.handleSearch}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <header className="App-header">
          <ShowSearchResult videos={videos} loading={loading} error={error} />
        </header>
      </div>
    );
  }
}

export default App;
