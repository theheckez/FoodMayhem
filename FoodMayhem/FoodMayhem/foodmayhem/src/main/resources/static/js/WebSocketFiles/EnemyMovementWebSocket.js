enemyMovementWebSocket.onopen = function () 
{
	console.log("Websocket de movimiento enemigo activado");
}

enemyMovementWebSocket.onerror = function (e) {
    console.log("WS error: " + e);
}

enemyMovementWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);
	
	if(obj._dataType == "movement")
	{
		gameScene.enemies.children.each(function (enem) {
			gameScene.ClientUpdateEnemyPosition(enem, obj.enemy_id, obj.enemy_x, obj.enemy_y);
			  }, gameScene);
		console.log("Recibo movimientos");
	} else if (obj._dataType == "target")
	{
		if(obj.target == 1)
		{
			gameScene.enemies.children.each(function (enem) {
				gameScene.ClientUpdateEnemyTarget(enem, obj.id, player1);
				  }, gameScene);
		} else 
		{
			gameScene.enemies.children.each(function (enem) {
				gameScene.ClientUpdateEnemyTarget(enem, obj.id, player2);
				  }, gameScene);
		}
	} else if (obj.dataType == "damage")
	{
		gameScene.enemies.children.each(function (enem) {
			gameScene.ClientUpdateEnemyTarget(enem, obj.id, obj.enemy_x);
			  }, gameScene);
	}


	
}

enemyMovementWebSocket.sendWS = function (id, x, y, targetId, dataType) {
	let message = {
            enemy_id: id,
			enemy_x: x,
			enemy_y: y,
			target: targetId,
			_dataType: dataType
           	
	};

	var mes = JSON.stringify(message)
		
	enemyMovementWebSocket.send(mes);
}
