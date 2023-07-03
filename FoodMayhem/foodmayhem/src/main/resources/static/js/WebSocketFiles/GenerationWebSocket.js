
generationWebSocket.onmessage = function (msg) {
	var obj = JSON.parse(msg.data);

    trees = obj.trees;
    enemiesList = obj.enemies

    generateObjects = true;
    console.log(obj);
    console.log(trees);
	console.log("Recibo generación de mapa");
}

generationWebSocket.sendWS = function (treeList, enemiesList) {
	let message = {
        trees: treeList,
        enemies: enemiesList
    }
	
	var mes = JSON.stringify(message)
		
	generationWebSocket.send(mes);
}