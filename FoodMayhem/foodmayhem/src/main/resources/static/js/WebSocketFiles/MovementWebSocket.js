movementWebSocket.onopen = function () 
{
	console.log("Websocket de movimiento activado");
}

movementWebSocket.onerror = function (e) {
    console.log("WS error: " + e);
}

movementWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);
	if (obj.player_id == 1)
	{
		player1.x = obj.player_x;
		player1.y = obj.player_y;
	  
		player1.padMovement = obj.player_pad;
		
		player1.dirUp = obj.player_dirUp;
		player1.dirLeft = obj.player_dirLeft;
		player1.dirRight = obj.player_dirRight;
		player1.dirDown = obj.player_dirDown;
		
		player1.isAttacking = obj.player_attack;

	}
	
	if(obj.player_id == 2 ){
		player2.x = obj.player_x;
		player2.y = obj.player_y;
	  
		player2.padMovement = obj.player_pad;
		
		player2.dirUp = obj.player_dirUp;
		player2.dirLeft = obj.player_dirLeft;
		player2.dirRight = obj.player_dirRight;
		player2.dirDown = obj.player_dirDown;

		player2.isAttacking = obj.player_attack;

	
	}
	console.log("Recibo movimientos");
}

movementWebSocket.sendWS = function (id, x, y, pad, up, left, down, right, attack) {
	let message = {
            player_id: id,
			player_x: x,
			player_y: y,
            player_pad: pad,
            player_dirUp : up,
            player_dirLeft : left,
            player_dirDown : down,
            player_dirRight : right,		
			player_attack: attack	
	};
	
	var mes = JSON.stringify(message)
		
	movementWebSocket.send(mes);
}