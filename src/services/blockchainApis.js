import axios from 'axios';
var querystring = require('querystring');

export default {
  api(address, coinName) {

    var data = {
      address: address,
      coinName: coinName
    }
    switch (coinName) {
      case 'Ethereum':
        return axios.post('http://localhost:8001/getEthAmtFromAddress', querystring.stringify(data));
        break;
      case 'Bitcoin':
        return axios.post('http://localhost:8001/getBtcAmtFromAddress', querystring.stringify(data));
        break;
      default:
        return 'ya dun goofed'
    }
  }
}
