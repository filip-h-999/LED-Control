from flask import Flask, render_template
from flask_sock import Sock
from gpiozero import PWMLED
from time import sleep

ledRed = PWMLED(13)
ledGreen = PWMLED(18)
ledBlue = PWMLED(19)

app = Flask(__name__)
sock = Sock(app)

@app.route("/")
def index():
    return render_template("index.html")


@sock.route("/echo")
def echo(ws):
    while True:
        msg = ws.receive()
        print(msg)
        # ws.send(msg)

        hex_string = msg.lstrip('#')
        red, green, blue = (int(hex_string[i:i+2], 16) for i in (0, 2, 4))
        print(f"Red: {red}, Green: {green}, Blue: {blue}")

        ledRed.value = red / 255
        ledGreen.value = green / 255
        ledBlue.value = blue / 255


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8006)