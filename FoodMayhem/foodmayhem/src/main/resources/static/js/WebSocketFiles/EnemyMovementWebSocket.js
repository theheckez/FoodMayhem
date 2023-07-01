enemyMovementWebSocket.onopen = function () 
{
	console.log("Websocket de movimiento enemigo activado");
}

enemyMovementWebSocket.onerror = function (e) {
    console.log("WS error: " + e);
}

enemyMovementWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);
	
	gameScene.enemies.children.each(function (enem) {
		gameScene.ClientUpdateEnemyPosition(enem, obj.enemy_id, obj.enemy_x, obj.enemy_y);
	  	}, gameScene);

	console.log("Recibo movimientos");
}

enemyMovementWebSocket.sendWS = function (id, x, y) {
	let message = {
            enemy_id: id,
			enemy_x: x,
			enemy_y: y,
           	
	};
	
	var mes = JSON.stringify(message)
		
	enemyMovementWebSocket.send(mes);
}