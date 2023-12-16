# LED Control Project

## Overview

This project allows you to control LEDs using technology like Arduino, Raspberry Pi, etc. Additionally, it includes a feature to turn on the LEDs automatically at sunset.

## Features

- Turn LEDs on/off.
- Adjust LED brightness.
- Customize LED colors.
- Automatic turn-on at sunset.

## Getting Started

### Prerequisites

- Hardware requirements like Arduino or Pi, LEDs, resistors, etc.

### Installation

1. Clone the repository: `git clone https://github.com/your-username/led-control.git`
2. Navigate to the project directory: `cd led-control`

## Automatic Turn-On at Sunset

This project includes a feature that automatically turns on the LEDs at sunset. This is achieved by the sunset.py script.

To enable this feature, make sure to put it in crontab and set the times to: 

```
January: 17 17 * 1 * /usr/bin/python  path-to/sunset.py
February: 47 17 * 2 * /usr/bin/python  path-to/sunset.py
March: 17 18 * 3 * /usr/bin/python  path-to/sunset.py
April: 48 18 * 4 * /usr/bin/python  path-to/sunset.py
May: 18 19 * 5 * /usr/bin/python  path-to/sunset.py
June: 49 19 * 6 * /usr/bin/python  path-to/sunset.py
July: 19 20 * 7 * /usr/bin/python  path-to/sunset.py
August: 50 20 * 8 * /usr/bin/python  path-to/sunset.py
September: 20 21 * 9 * /usr/bin/python  path-to/sunset.py
October: 51 21 * 10 * /usr/bin/python  path-to/sunset.py
November: 21 16 * 11 * /usr/bin/python  path-to/sunset.py
December: 00 16 * 12 * /usr/bin/python path-to/sunset.py
```

This is for the Region Berlin. Also change the Path to your Path.