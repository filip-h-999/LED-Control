window.onload = function () {
	var colorPicker = new iro.ColorPicker(".colorPicker", {
		width: 280,
		color: "rgb(255, 120, 0)",
		borderWidth: 0.5,
		borderColor: "#171F30",
	});

	var values = document.getElementById("values");
	var hexInput = document.getElementById("hexInput");

	colorPicker.on(["color:init", "color:change"], function (color) {
		values.innerHTML = [
			"hex: " + color.hexString,
			"rgb: " + color.rgbString,
			"brightness: " + color.value + "%",
		].join("<br>");

		hexInput.value = color.hexString;
	});

	hexInput.addEventListener("change", function () {
		colorPicker.color.hexString = this.value;
	});
}
