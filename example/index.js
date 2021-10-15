const BH1750 = require('../BH1750');

const options = {
    readMode: BH1750.ONETIME_H_RESOLUTION_MODE
};

const bh1750 = new BH1750(options);

let data = bh1750.readData();

console.log(data);

