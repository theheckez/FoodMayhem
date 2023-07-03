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
		if(obj.player_attack)
		{
			player1.actualTime = gameScene.time.now / 1000;
  
			if (player1.actualTime > (player1.timeSinceLastIncrement + player1.attackCooldown)) {
		
			  player1.setVelocityX(0);
			  player1.setVelocityY(0);
		
			  if(player1.spriteName.punch !== undefined){player1.anims.play(`punch-${player1.direction}`)}
			  else {
				  player1.anims.play(`punchB-${player1.direction}`)
			  };
		
			  player1.attackHitbox.x = player1.x + player1.body.halfWidth/2;
			  player1.attackHitbox.y = player1.y + player1.body.halfHeight/2;
		
			  gameScene.physics.add.existing(player1.attackHitbox);
			  player1.attackHitbox.setCircle(player1.attackRange)
		
			  player1.hitSound.play();
		
			  player1.timeSinceLastIncrement = gameScene.time.now / 1000;
		
			  gameScene.time.delayedCall(250, () => {
				player1.attackHitbox.body.enable = false;
				gameScene.physics.world.remove(player1.attackHitbox.body);
			  });
			}
		} else {
		
					  // Estado de movimiento
		player1.x = obj.player_x;
		player1.y = obj.player_y;
		  
		player1.setVelocity(0);
	
		  if (obj.player_dirLeft) {
			player1.setVelocityX(-100);
			player1.direction = 'left';
			player1.anims.play(player1.spriteName.left, true);
		  } else if ( obj.player_dirRight) {
			player1.setVelocityX(100);
			player1.direction = 'right';
			player1.anims.play(player1.spriteName.right, true);
		  }
		  if ( obj.player_dirUp) {
			player1.setVelocityY(-player1.speed);
			player1.direction = 'up';
			player1.anims.play(player1.spriteName.up, true);
		  } else if (obj.player_dirDown) {
			player1.setVelocityY(player1.speed);
			player1.direction = 'down';
			player1.anims.play(player1.spriteName.down, true);
		  }
	  
		  if (!(obj.player_dirDown || obj.player_dirUp ||
			obj.player_dirLeft  || obj.player_dirRight)) {
	  
			player1.setVelocity(0);
			player1.anims.play(player1.spriteName.idle);
		}
		}


		  // Estado de movimiento

	
	  } else if(obj.player_id == 2 ){

		if(obj.player_attack)
		{
			player2.actualTime = gameScene.time.now / 1000;
  
			if (player2.actualTime > (player2.timeSinceLastIncrement + player2.attackCooldown)) {
		
			  player2.setVelocityX(0);
			  player2.setVelocityY(0);
		
			  if(player2.spriteName.punch !== undefined){player2.anims.play(`punch-${player2.direction}`)}
			  else {
				  player2.anims.play(`punchB-${player1.direction}`)
			  };
		
			  player2.attackHitbox.x = player2.x + player2.body.halfWidth/2;
			  player2.attackHitbox.y = player2.y + player2.body.halfHeight/2;
		
			  gameScene.physics.add.existing(player2.attackHitbox);
			  player2.attackHitbox.setCircle(player2.attackRange)
		
			  player2.hitSound.play();
		
			  player2.timeSinceLastIncrement = gameScene.time.now / 1000;
		
			  gameScene.time.delayedCall(250, () => {
				player2.attackHitbox.body.enable = false;
				gameScene.physics.world.remove(player2.attackHitbox.body);
				
			  });
			} 
		} else {
		// Estado de movimiento
	
			player2.x = obj.player_x;
			player2.y = obj.player_y;
		
		player2.setVelocity(0);
	
		  if (obj.player_dirLeft) {
			if(isHost)player2.setVelocityX(-100);
			player2.direction = 'left';
			player2.anims.play(player2.spriteName.left, true);
		  } else if ( obj.player_dirRight) {
			if(isHost)player2.setVelocityX(100);
			player2.direction = 'right';
			player2.anims.play(player2.spriteName.right, true);
		  }
		  if ( obj.player_dirUp) {
			if(isHost)player2.setVelocityY(-player2.speed);
			player2.direction = 'up';
			player2.anims.play(player2.spriteName.up, true);
		  } else if (obj.player_dirDown) {
			if(isHost)player2.setVelocityY(player2.speed);
			player2.direction = 'down';
			player2.anims.play(player2.spriteName.down, true);
		  }
	  
		  if (!(obj.player_dirDown || obj.player_dirUp ||
			obj.player_dirLeft  || obj.player_dirRight)) {
	  
			if(isHost)player2.setVelocity(0);
			player2.anims.play(player2.spriteName.idle);
		}
		}
	
		  // Estado de movimiento
		
		

	}

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