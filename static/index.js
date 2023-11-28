const socket = new WebSocket("ws://" + location.host + "/led");

document.addEventListener("DOMContentLoaded", function () {
	let hex;
	let onOff = false;
	let savedColor

	const switchState = localStorage.getItem('switchState');
    onOff = switchState;

    const color = localStorage.getItem('color');
    savedColor = color;

	function switchOnOff() {
        if (!this.checked) {
            socket.send("#000000");
            localStorage.setItem('switchState', false);
        } else {
            socket.send(savedColor);
        }
    }

	window.onload = function () {
		// switchOnOff();
		var colorPicker = new iro.ColorPicker(".colorPicker", {
			width: 280,
			color: savedColor,
			borderWidth: 0.5,
			borderColor: "#171F30",
		});

		var values = document.getElementById("values");
		var hexInput = document.getElementById("hexInput");

		socket.addEventListener("open", function (event) {
			// Attach the validate function to the change event of the checkbox
			const switchElement = document.getElementById("switch");
			switchElement.checked = onOff == 'true';
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
                    localStorage.setItem('switchState', true);
                    localStorage.setItem('color', hex);
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
