import axios from 'axios';

export default {

    getUsd(coinName){
      return axios.get('https://api.coinmarketcap.com/v1/ticker/'+coinName+'/')
    }
}
