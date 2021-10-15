/*
 *   BH1750.js
 *
 *     A Node.js I2C module for TODO.
 *
 *     */

'use strict';

const i2c = require('i2c-bus');

class BH1750 {

  static POWER_DOWN = 0x00
  static POWER_ON = 0x01
  static RESET = 0x07
  static CONTINUOUS_H_RESOLUTION_MODE = 0x10
  static CONTINUOUS_H_RESOLUTION_MODE2 = 0x11
  static CONTINUOUS_L_RESOLUTION_MODE = 0x13
  static ONETIME_H_RESOLUTION_MODE = 0x20
  static ONETIME_H_RESOLUTION_MODE2 = 0x21
  static ONETIME_L_RESOLUTION_MODE = 0x23 

  constructor(options) {

    this.i2cBusNo = (options && options.hasOwnProperty('i2cBusNo')) ? options.i2cBusNo : 1; 
    this.i2cAddress = (options && options.hasOwnProperty('i2cAddress')) ? options.i2cAddress : BH1750.BH1750_DEFAULT_I2C_ADDRESS();
    this.readMode = (options && options.hasOwnProperty('readMode')) ? options.readMode : BH1750.CONTINUOUS_H_RESOLUTION_MODE;

    this.init();
  }
  
  init() {
    const i2cBus = i2c.openSync(this.i2cBusNo); 
    i2cBus.readWordSync(this.i2cAddress, this.readMode);
    i2cBus.closeSync();
  }
  
  readData() {
    const i2cBus = i2c.openSync(this.i2cBusNo);
    let data = i2cBus.readWordSync(this.i2cAddress, this.readMode);
    i2cBus.closeSync();
    if(data) {
      return this.toLux(data);
    } else {
      throw 'Read Error';
    }
  }

  toLux(value) {
    let loByte = value >> 8;
    let hiByte = value - (loByte << 8);
    return (hiByte*256+loByte)/1.2;
  }

  static BH1750_DEFAULT_I2C_ADDRESS() {
    return 0x23;
  }
}

module.exports = BH1750;
