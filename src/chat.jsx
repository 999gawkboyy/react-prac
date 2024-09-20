import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import './chat.css'
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState('')
    const [message, setMessage] = useState('')
    const ws = useRef(null);
    const [nicknameSet, setNicknameSet] = useState(false);

    // const [ ip , setIp ] = useState();

    // useEffect( () => {
    //     axios.get('https://geolocation-db.com/json/')
    //     .then((res) => {
    //     setIp(res.data.IPv4)
    //     })
    // },[])

    useEffect(() => {
        const storedNickname = localStorage.getItem('nickname');
        if (storedNickname) {
            setNickname(storedNickname);
            setNicknameSet(true); 
        }
        ws.current = new WebSocket('wss://test.9gb.me/ws/');

        ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
        };

        return () => {
        ws.current.close();
        };
    }, [])

    const sendMessage = () => {
        if (message && nicknameSet) {
            ws.current.send(JSON.stringify({ text: message }));
            setMessage('');
        }
    }   

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    const handleSetNickname = () => {
        if (nickname) {
            localStorage.setItem('nickname', nickname);
            ws.current.send(JSON.stringify({ type: 'setNickname', nickname }));
            setNicknameSet(true);
        }
    }

    useEffect(() => {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, [messages]);

    return (
        <div>
            
            <h1>Chat</h1>
            <div>
                {nicknameSet ? (
                <strong>닉네임: {nickname}</strong>
                ) : (
                <>
                    <input
                    type="text"
                    placeholder="Enter your nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={handleSetNickname}
                    />
                    <button onClick={handleSetNickname}>Set Nickname</button>
                </>
                )}
            </div>
            <div id="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.nickname}:</strong> {msg.text == null ? "*입장하셨습니다*": msg.text}
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