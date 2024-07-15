"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { UserIcon } from 'lucide-react';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; type: 'prompt' | 'response' }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMessages) => [{ text: input, type: 'prompt' }, ...prevMessages]);
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { prompt: input });
      setMessages((prevMessages) => [{ text: res.data.text, type: 'response' }, ...prevMessages]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [{ text: 'There was an error processing the request', type: 'response' }, ...prevMessages]);
    }
    setLoading(false);
    setInput('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed bottom-4 right-4 w-[30rem] bg-white shadow-lg rounded-lg ${isOpen ? 'h-[48rem]' : 'h-12'} transition-all duration-300`}>
      <div className="bg-blue-500 text-white p-2 cursor-pointer text-center rounded-t-lg flex justify-between items-center" onClick={toggleChat}>
        <span>AI Assistant</span>
      </div>
      {isOpen && (
        <div className="p-4 flex flex-col space-y-4 overflow-y-auto max-h-[44rem]">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
          </form>
          <div className="flex flex-col-reverse space-y-4 space-y-reverse">
            {loading && (
              <div className="p-2 bg-gray-100 rounded-lg flex items-start space-x-2">
                <UserIcon className="h-5 w-5 text-gray-500"/>
                <p className="text-gray-500">Typing...</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`p-2 rounded-lg flex items-start space-x-2 ${message.type === 'prompt' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}>
                <UserIcon className={`h-5 w-5 ${message.type === 'prompt' ? 'text-blue-500' : 'text-gray-500'}`}/>
                <p className="text-gray-700">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
