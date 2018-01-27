export default {
    getBtcBalance(balance){
      var satsToBTC = balance / 1e8;
      return satsToBTC;
    },
    getEthBalance(balance){
      var weiToETH = balance / 1e18;
      return weiToETH;
    }
}
