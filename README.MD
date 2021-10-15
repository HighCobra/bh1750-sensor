# bh1750-sensor

Welcome to bh1750-sensor module. A Node.JS module for the I2C BH1750 Ambient Light Sensor.

This module use [i2c-bus](https://github.com/fivdi/i2c-bus) to provide access to the I2C bus on Raspberry Board. It should also work with other Linux based boards.

## Example

```
const BH1750 = require('bh1750-sensor');

const options = {
    readMode: BH1750.ONETIME_H_RESOLUTION_MODE
};

const bh1750 = new BH1750(options);

let data = bh1750.readData();

console.log(data);
```
