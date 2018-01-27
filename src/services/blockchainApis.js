import axios from 'axios';

export default {

    ethApi(address){
      return axios.get('https://api.blockcypher.com/v1/eth/main/addrs/'+address+'/balance')
    }
}
