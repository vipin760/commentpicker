import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_KEY } from '../../api';

const ACCESS_TOKEN = ACCESS_KEY
const API_URL = 'https://graph.instagram.com/';

const CommentPicker = () => {
  const [postUrl, setPostUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [winner, setWinner] = useState(null);

  const fetchComments = async (mediaId) => {
    try {
      const response = await axios.get(`${API_URL}${mediaId}/comments`, {
        params: {
          access_token: ACCESS_TOKEN,
          fields: 'text,username',
        },
      });
      setComments(response.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchMediaId = async (shortcode) => {
    try {
      const response = await axios.get(`${API_URL}me/media`, {
        params: {
          access_token: ACCESS_TOKEN,
          fields: 'id,permalink',
        },
      });
      const mediaItem = response.data.data.find(item => item.permalink.includes(shortcode));
      return mediaItem ? mediaItem.id : null;
    } catch (error) {
      console.error('Error fetching media ID:', error);
      return null;
    }
  };

  const pickWinner = () => {
    if (comments.length > 0) {
      const randomIndex = Math.floor(Math.random() * comments.length);
      setWinner(comments[randomIndex]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shortcode = extractMediaIdFromUrl(postUrl);
    const mediaId = await fetchMediaId(shortcode);
    if (mediaId) {
      fetchComments(mediaId);
    }
  };

  const extractMediaIdFromUrl = (url) => {
    const regex = /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={postUrl} 
          onChange={(e) => setPostUrl(e.target.value)} 
          placeholder="Enter Instagram Post URL" 
        />
        <button type="submit">Fetch Comments</button>
      </form>
      <button onClick={pickWinner}>Pick a Winner</button>
      {winner && (
        <div>
          <h2>Winner</h2>
          <p>{winner.username}</p>
          <p>{winner.text}</p>
        </div>
      )}
    </div>
  );
};
export default CommentPicker;
