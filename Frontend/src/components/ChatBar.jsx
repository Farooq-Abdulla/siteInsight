import React, { useState } from 'react';

function ChatBar() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([{ type: 'user', content: inputValue }, ...messages]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col bg-gray-500 w-screen relative">
      <div className="text-white font-bold text-center sticky-top">siteInsight</div>
      <div className="mx-4 mt-4 space-y-2 pb-10 overflow-y-auto" style={{ height: 'calc(100% - 3rem)' }}>
        {messages.map((message, index) => (
          <div key={index} className={`message-${message.type} px-2 py-1 rounded-md bg-gray-200 text-gray-800`}>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        name="searchBox"
        className="border border-gray-400 rounded-md p-2 w-full absolute bottom-0 left-0"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
    </div>
  );
}

export default ChatBar;
