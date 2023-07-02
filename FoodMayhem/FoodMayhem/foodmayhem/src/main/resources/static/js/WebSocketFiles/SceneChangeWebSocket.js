sceneChangeWebSocket.onopen = function () 
{
	console.log("Websocket de cambio de escena");
}

sceneChangeWebSocket.onerror = function (e) {
    console.log("WS error: " + e);
}

sceneChangeWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);

    if(obj.value == 'mainGame')
    {
        gameScene.scene.wake();
    }
    else{
        gameScene.scene.start(obj.value);
        if(obj.value == 'PantallaPausa') gameScene.scene.sleep();
    }
  
    
}

sceneChangeWebSocket.sendWS = function (scene) {
	let message = {
        value: scene
      
    }
	
	var mes = JSON.stringify(message)
		
	sceneChangeWebSocket.send(mes);
}