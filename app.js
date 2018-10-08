const xinput = require("./xinputjs-master");
const logupd = require("log-update");
const padEnd = require("lodash.padend");

var dirSym = "";  

var combi = [64, 270, 31, 90];

[0]
.filter(n => xinput.IsConnected(n))
.map(n => xinput.WrapController(n, {
	interval: 15,
	deadzone: {
		x: 0.18,
		y: 0.18
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
      angle = Math.floor(Math.atan2(-x, -y) * 180 / Math.PI + 180);
      distance = Math.floor(Math.sqrt((x * x) + (y * y)));

      if(337.5 < angle || angle < 22.5) { dirSym = "↑";
      } else if(22.5 < angle && angle < 67.5) { dirSym = "↗";
      } else if(67.5 < angle && angle < 112.5) { dirSym = "→";
      } else if(112.5 < angle && angle < 157.5) { dirSym = "↘";
      } else if(157.5 < angle && angle < 202.5) { dirSym = "↓";
      } else if(202.5 < angle && angle < 247.5) { dirSym = "↙";
      } else if(247.5 < angle && angle < 292.5) { dirSym = "←";
      } else if(292.5 < angle && angle < 337.5) { dirSym = "↖"; }

      if(distance < 10) dirSym = "+";

      logupd(`${padEnd(angle, 3)}° ${padEnd(distance, 3)} ${dirSym}`);
      //console.log(dirSym);
    }
	});
});