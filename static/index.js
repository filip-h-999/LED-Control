const protocol = location.protocol === "https:" ? "wss:" : "ws:";
const socket = new WebSocket(protocol + "//" + location.host + "/echo");

document.addEventListener("DOMContentLoaded", function () {
  let hex;
  let isLedOn = false;
  let savedColor;

  const switchState = localStorage.getItem("switchState");
  isLedOn = switchState === "true";

  const color = localStorage.getItem("color");
  savedColor = color || "#ff1100"; // Default to red if no saved color

  function handleSwitchToggle() {
    if (!this.checked) {
      socket.send("#000000");
      localStorage.setItem("switchState", "false");
    } else {
      socket.send(savedColor);
      localStorage.setItem("switchState", "true");
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
      switchElement.checked = isLedOn;
      if (switchElement) {
        switchElement.addEventListener("change", handleSwitchToggle);
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
        savedColor = hex; // Update savedColor when color changes
        localStorage.setItem("color", hex); // Always save color changes
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
