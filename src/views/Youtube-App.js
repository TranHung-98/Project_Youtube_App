import React, { useState, useEffect } from 'react';

const YoutubeCloneApp = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'AIzaSyDqqUYo-sxHlLbWUmrF3I8zTdswuRVpIKw';

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      setError('Error fetching videos. Please try again later.');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim().length >= 1) {
      fetchVideos();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className=''>
        <div className='d-flex justify-content-between align-items-center'>
          <input
            type="text"
            className='form-control'
            id='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for videos"
          />
          <button type="button" className='btn btn-primary ms-3' onClick={handleSearch}>Search</button>
        </div>
        <div className='my-5'>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {videos.length > 0 && (
            <>
              {videos.map((result, index) => {
                if (result.id.kind === 'youtube#video') {
                  const videoTitle = result?.snippet?.title ||
                    result?.snippet?.localized?.title ||
                    result?.id?.videoId ||
                    'Title Not Available';
                  const videoId = result?.id?.videoId;

                  return (
                    <div key={index} className='mt-3'>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={videoTitle}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                }
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default YoutubeCloneApp;
