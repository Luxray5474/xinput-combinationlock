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
  
  gamepad.addListener("analog-input", (input, data) => { //what's beautiful about his wrapper is that it outputs both axes simultaneously
    if(input == "rightstick") {
      x = data.x * 100;
      y = data.y * 100;
      angle = Math.atan2(-x, -y) * 180 / Math.PI + 180;
      console.log(Math.floor(angle) + '°');
    }
	});
});