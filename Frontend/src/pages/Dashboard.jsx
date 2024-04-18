import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Dashboard() {
    const [inputValue, setInputValue] = useState('');
    const [reply, setReply] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            try {
                const res = await axios.post("http://localhost:3000/api/v1/chat/memory", {
                    input: inputValue
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setReply(res.data);
                setChatHistory(prevChat => [...prevChat, { user: inputValue, agent: res.data }]);
                setInputValue('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white" >
            <div className="overflow-y-auto flex-grow max-h-[calc(100vh-150px)] p-5" ref={chatContainerRef}>
                {chatHistory.map((message, index) => (
                    <div className="border border-black m-5 w-11/12 p-2" key={index}>
                        {message.user !== '' && <p><strong>User:</strong> {message.user}</p>}
                        {message.agent !== '' && <p><strong>Agent:</strong> {message.agent}</p>}
                    </div>
                ))}
            </div>

            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-9/12">
                <textarea
                    className="border border-black w-full h-20 p-2 resize-none text-black"
                    placeholder="Ask anything"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default Dashboard;
