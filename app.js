const xinput = require("./xinputjs-master");

[0]
.filter(n => xinput.IsConnected(n))
.map(n => xinput.WrapController(n, {
	interval: 20,
	deadzone: {
		x: 0.15,
		y: 0.15
	},
	holdtime: 500
}))
.forEach(gamepad => {
  var gamepadID = gamepad.deviceNumber;
  
  gamepad.addListener("connection-changed", (isConnected) => {
		console.log(isConnected ? "Controller Connected" : "Controller Disconnected");
	});
  
  gamepad.addListener("analog-input", (input, data) => {
		console.log(`${gamepadID}::${input}:`, data);
	});
});