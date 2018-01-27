export default {
    getEthBalance(balance){
      var weiToETH = balance / 1e18;
      return weiToETH;
    }
}
