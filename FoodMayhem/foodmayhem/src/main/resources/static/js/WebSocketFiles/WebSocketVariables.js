//<summary>
// Declaration of WEBSOCKET variables to use in teh rest of .js files
// All (____)Path variables indicate the path where the WebSocket should be listening.
// All (____)WebSocket variables are references to WebSockets created with the corresponding
//              path assigned.
//</summary>

var movementPath = 'ws://127.0.0.1:8080/movement';
var movementWebSocket = new WebSocket(movementPath);

var connectionPath = 'ws://127.0.0.1:8080/sessions';
var connectionWebSocket;


var generationPath = 'ws://127.0.0.1:8080/randomGeneration';
var generationWebSocket = new WebSocket(generationPath);

var enemyMovementPath = 'ws://127.0.0.1:8080/enemyMovement';
var enemyMovementWebSocket = new WebSocket(enemyMovementPath);