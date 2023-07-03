openConnection = function()
{
	 connectionWebSocket = new WebSocket(connectionPath);
	 
	 connectionWebSocket.onopen = function () {
        console.log("Se ha abierto el lobby de juego");
  	 }

	connectionWebSocket.onerror = function (e) {
	    console.log("WS error: " + e);
	    
	}
	
	connectionWebSocket.onmessage = function (msg) {
			
		var data = JSON.parse(msg.data);
        console.log(msg);
		if(data.type === "playerID")
		{
			if(data.player == 1){
				p1Connected = true;
				currentPlayer = 1;

				//lobbyThis.setPlayer1State('Connected');
			}else if (data.player == 2){
				p2Connected = true;
				currentPlayer = 2;
    
				//lobbyThis.setPlayer2State('Connected');
			}else if(data.player == 0){
				p1Connected = true;
				p2Connected = true;
			}
		}
		if(data.type === "playerGone")
		{
			switch(currentPlayer)
			{
				default:
					break;
				case 1:
					p2Connected = false;
					break;
				case 2:
					p1Connected = false;
					break;
			}
			
		}
	
		if(data.type === "play")
		{
            console.log("P1" + p1Connected + " y P2: " + p2Connected)
            console.log("Entramos a play");
			if(p1Connected && p2Connected)
			{
                console.log("Estan los dos conectados");
				characterSelectScene.scene.start('mainGame');
			}
		}
		
		if(data.type === "gameOver")
		{
			if(genEnem.scene.isActive('gameOver') == false)
			{
				genEnem.scene.stop();
            	bcMusicGame.pause();
				genEnem.scene.start('gameOver');
			}
			connectionWebSocket.close();
			switch(currentPlayer)
			{
				default:
					break;
				case 1:
					p2Connected = false;
					break;
				case 2:
					p1Connected = false;
					break;
			}
		}
	}
	
	connectionWebSocket.sendWS = function (dataType) {
	
		let message = {
			type: dataType
		};
		
		var mes = JSON.stringify(message);
		connectionWebSocket.send(mes);
	}
}