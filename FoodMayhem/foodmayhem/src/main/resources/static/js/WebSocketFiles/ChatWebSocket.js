
chatWebSocket.onopen = function () 
{
	console.log("Websocket de chat");
}

chatWebSocket.onerror = function (e) {
    console.log("WS error: " + e);
}

chatWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);

	console.log(obj);
	const usernameSpan = document.createElement('span');
    const usernameText = document.createTextNode(obj._nick);
    usernameSpan.className = 'username';
    usernameSpan.appendChild(usernameText);
	const messageBodyText = document.createTextNode(obj._message);
    const messageBodySpan = document.createElement('span');
    messageBodySpan.className = 'messageBody';
    messageBodySpan.appendChild(messageBodyText);
    const messageLi = document.createElement('li');
    messageLi.setAttribute('username', obj._nick);
    messageLi.append(usernameSpan);
    messageLi.append(messageBodySpan);
    addMessageElement(messageLi); 
  
    
}

chatWebSocket.sendWS = function (nick, msg) {
	let message = {
        _nick: nick,
		_message: msg
      
    }
	console.log("Enviando mensaje");
	var mes = JSON.stringify(message)
		
	chatWebSocket.send(mes);
}

