import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './chat.css'
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [ws, setWs] = useState(null);
    // const [ ip , setIp ] = useState();

    // useEffect( () => {
    //     axios.get('https://geolocation-db.com/json/')
    //     .then((res) => {
    //     setIp(res.data.IPv4)
    //     })
    // },[])

    useEffect(() => {
        const socket = new WebSocket('wss://test.9gb.me/ws/')
        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data])
        }

        setWs(socket)

        return () => {
            socket.close()
        }
    }, [])

    const sendMessage = () => {
        if (input && ws) {
            ws.send(input)
            setInput('')
        }
    }

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }
    //console.log(ip)
    useEffect(() => {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, [messages]);

    return (
        <div>
            
            <h1>Chat</h1>
            <div id="messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input 
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Type your message ...'
                onKeyDown={keyHandler}
            />

            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat