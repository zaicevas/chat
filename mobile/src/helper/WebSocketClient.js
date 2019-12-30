const connect = () => {
    const ws = new WebSocket('ws://192.168.1.34:8080/chat');
	ws.onmessage = (data) => {
        console.log("GOT MESSAGE: ");
        console.log(data);
    }
    ws.onopen = () => {
        console.log("Connection open, sending");
        ws.send(JSON.stringify({id: 5}));
    }
    ws.onerror = e => {
        console.log(e.message);
    };
    return ws;
}

const disconnect = (ws) => {
    if (ws != null) {
        ws.close();
    }
    console.log("Disconnected");
}

const send = (ws, obj) => {
    ws.send(JSON.stringify(obj));
    console.log("obj send");
}

const showGreeting = (message) => {
    $("#greetings").append(" " + message + "");
}

export default { connect, disconnect, send };