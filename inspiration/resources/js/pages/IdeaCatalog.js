import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ideas() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    axios.get('/api/ideas')
      .then(response => setIdeas(response.data))
      .catch(error => console.error('Error fetching ideas:', error));
  }, []);

  return (
    <div>
      <h1>アイディア一覧</h1>
      {ideas.map(idea => (
        <div key={idea.id}>{idea.title}</div>
      ))}
    </div>
  );
}

export default Ideas;
