enemyMovementWebSocket.onopen = function () 
{
	console.log("Websocket de movimiento enemigo activado");
}

enemyMovementWebSocket.onerror = function (e) {
    console.log("WS error: " + e);
}

enemyMovementWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);
	if(obj.type == "malvin")
	{
		gameScene.enemies.children.each(function (enem) {
			gameScene.ClientUpdateEnemy(enem, obj.enemy_id,obj.enemy_health, obj.enemy_x, obj.enemy_y, obj.target, obj.enemy_direction, obj.enemy_module);
			 }, gameScene);
	}
	else {
		gameScene.bosses.children.each(function (enem) {
			gameScene.ClientUpdateEnemy(enem, obj.enemy_id,obj.enemy_health, obj.enemy_x, obj.enemy_y, obj.target, obj.enemy_direction, obj.enemy_module);
			 }, gameScene);
	}

}

enemyMovementWebSocket.sendWS = function (id, health, x, y, targetId, direction, mod, _type) {
	let message = {
            enemy_id: id,
			enemy_health: health,
			enemy_x: x,
			enemy_y: y,
			target: targetId,
			enemy_direction: direction,
			enemy_module: mod,
			type: _type
           	
	};

	var mes = JSON.stringify(message)
		
	enemyMovementWebSocket.send(mes);
}
