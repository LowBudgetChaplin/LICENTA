"use client";

import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/chat', { prompt: input });
      setResponse(res.data.text);
    } catch (error) {
      console.error(error);
      setResponse('There was an error processing your request.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
