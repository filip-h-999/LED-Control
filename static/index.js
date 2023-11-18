const socket = new WebSocket("ws://" + location.host + "/echo");

document.addEventListener("DOMContentLoaded", function () {
	let hex;

	function switchOnOff() {
		if (!this.checked) {
			socket.send("#000000");
		} else {
			socket.send(hex);
		}
	}

	window.onload = function () {
		// switchOnOff();
		var colorPicker = new iro.ColorPicker(".colorPicker", {
			width: 280,
			color: "rgb(255, 95, 0)",
			borderWidth: 0.5,
			borderColor: "#171F30",
		});

		var values = document.getElementById("values");
		var hexInput = document.getElementById("hexInput");

		socket.addEventListener("open", function (event) {
			// Attach the validate function to the change event of the checkbox
			const switchElement = document.getElementById("switch");
			if (switchElement) {
				switchElement.addEventListener("change", switchOnOff);
			}
			// console.log('WebSocket connection opened.');

			colorPicker.on(["color:init", "color:change"], function (color) {
				values.innerHTML = [
					"hex: " + color.hexString,
					"rgb: " + color.rgbString,
					"brightness: " + color.value + "%",
				].join("<br>");

				hexInput.value = color.hexString;

				hex = color.hexString;
				if (switchElement.checked) {
					socket.send(hex);
				}
			});
		});

		hexInput.addEventListener("change", function () {
			colorPicker.color.hexString = this.value;
		});

		// socket.addEventListener('message', function (event) {
		// 	console.log('Color: ', event.data);
		// });
	};
});
