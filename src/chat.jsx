import React, {useEffect, useState, useRef} from 'react';
import {useUser} from './UserContext'
import axios from 'axios'
import './chat.css'
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('')
    const ws = useRef(null);
    const {userData} = useUser();
    // const [ ip , setIp ] = useState();

    // useEffect( () => {
    //     axios.get('https://geolocation-db.com/json/')
    //     .then((res) => {
    //     setIp(res.data.IPv4)
    //     })
    // },[])

    useEffect(() => {
        ws.current = new WebSocket('wss://test.9gb.me/ws/');

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.current.onclose = () => {
            console.log("WebSocket closed");
        };
        
        const pingInterval = setInterval(() => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ type: 'ping' }));
            }
        }, 5000);

        return () => {
            console.log("close")
            ws.current.close();
            clearInterval(pingInterval);
        };
    }, [])

    const sendMessage = () => {
        if (message) {
            ws.current.send(JSON.stringify({ type: 'setNickname', nickname: userData.displayName }));
            ws.current.send(JSON.stringify({ text: message }));
            setMessage('');
        }
    }   

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    useEffect(() => {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, [messages]);

    return (
        <div>
            
            <h1>Chat</h1>
            
            <div id="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.nickname}:</strong> {msg.text == null ? "": msg.text}
                    </div>
                ))}
            </div>
            <input 
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Type your message ...'
                onKeyDown={keyHandler}
            />

            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat