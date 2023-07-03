
generationWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);
    console.log(obj)
    if(obj.type == "trees")  
    {
        trees = obj.array;
        generateTrees = true;
    }
    if(obj.type == "enemies") 
    {
        enemiesList = obj.array;
        generateEnemies = true;
    }
    if(obj.type == "demon")
    {
        bossesList = obj.array;
        generateBosses = true;
    }
    
	console.log("Recibo generación de mapa");
}

generationWebSocket.sendWS = function (list, _type) {
    console.log(list)
	let message = {
        array: list,
        type: _type
    }
	
	var mes = JSON.stringify(message)
		
	generationWebSocket.send(mes);
}