import axios from 'axios';

export default {

    btcApi(address){
      return axios.get('https://api.blockcypher.com/v1/btc/main/addrs/'+address+'/balance')
    },
    ethApi(address){
      return axios.get('https://api.etherscan.io/api?module=account&action=balance&address='+address+'&tag=latest&apikey=BWGS94RAXBYFGWE3EUW66H52TA56SN78NZ')
    }
}
