playerInfoWebSocket.onopen = function () 
{
	console.log("Websocket de información de jugadores");
}

playerInfoWebSocket.onerror = function (e) {
    console.log("WS error: " + e);
}

playerInfoWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);

    if(obj._dataType == "health")
    {
        if(obj.id == 1)
        {
            player1.lifeBar.draw(obj._value);
        }

        else if(obj.id == 2)
        {
            player2.lifeBar.draw(obj._value);
        }
    }
    else if(obj._dataType == "score")
    {
        if(obj.id == 1)
        {
            player1.lifeBar.kills = obj._value;
            player1.lifeBar.count();
        }

        else if(obj.id == 2)
        {
            player2.lifeBar.kills = obj._value;
            player2.lifeBar.count();
        }
    }
}

playerInfoWebSocket.sendWS = function (playerId, value, dataType) {
	let message = {
        id: playerId,
        _value: value,
        _dataType: dataType
    }
	
	var mes = JSON.stringify(message)
		
	playerInfoWebSocket.send(mes);
}