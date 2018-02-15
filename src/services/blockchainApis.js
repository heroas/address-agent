import axios from 'axios';
var querystring = require('querystring');

export default {

  btcApi(address) {
    return axios.get('https://api.blockcypher.com/v1/btc/main/addrs/' + address + '/balance')
  },
  //ETHERSCAN
  ethApi(address) {
    return axios.get('https://api.etherscan.io/api?module=account&action=balance&address=' + address + '&tag=latest&apikey=BWGS94RAXBYFGWE3EUW66H52TA56SN78NZ')
  },

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
