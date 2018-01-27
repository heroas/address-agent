import axios from 'axios';

export default {

    btcApi(address){
      return axios.get('https://api.blockcypher.com/v1/btc/main/addrs/'+address+'/balance')
    },
    ethApi(address){
      return axios.get('https://api.blockcypher.com/v1/eth/main/addrs/'+address+'/balance')
    }
}
