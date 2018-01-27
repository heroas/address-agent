import axios from 'axios';
import BlockchainApis from './services/blockchainApis'
import CryptoConverter from './services/cryptoConverter'
import CoinToUsd from './services/balanceToUsd'

export default {
  data() {
    let icons = {
      'BTC': '../public/btc.png',
      'ETH': '../public/eth.png'
    }

    return {
      saveCookie: false,
      importedJson: 'x',
      addDialog: false,
      newCoin: null,
      newAddress: null,
      supportedCoins: [{
          symbol: 'BTC',
          name: 'Bitcoin',
          avatar: icons['BTC']
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          avatar: icons['ETH']
        }
      ],
      addressBook: [],
      test: '',
      test2: '',
      total: 0
    }
  },
  methods: {
    importJson() {
      this.hidden = !this.hidden;
      this.$refs.inputBtn.click();
    },
    filesChange(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;
      this.createInput(files[0]);
    },
    createInput(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.importedJson = reader.result;
        console.log(vm.importedJson)
      }
      reader.readAsText(file);

    },
    addAddress(coin, address) {
      var coinInfo = this.searchForCoin(coin);

      this.addressBook.push({
        "avatar": coinInfo.avatar,
        "title": coinInfo.symbol,
        "subtitle": coinInfo.name,
        "address": address,
        "worth": 12000
      });
      this.addressBook.push({
        "divider": true,
        "inset": true
      })
    },
    searchForCoin(coinSymbol) {
      var i = null;
      for (i = 0; this.supportedCoins.length > i; i += 1) {
        if (this.supportedCoins[i].symbol === coinSymbol) {
          return this.supportedCoins[i];
        }
      }
    },
    getValueOfAddressBook() {
      for (var i = 0, len = this.addressBook.length; i < len; i++) {
        console.log(this.addressBook[i]);

      }

    },
    getValueOfAddress(address,coinName,bookPosition){
      if(coinName==='Ethereum'){
        BlockchainApis.ethApi(address)
          .then(response => {
            var balance = CryptoConverter.getEthBalance(response.data.balance);
            CoinToUsd.getUsd(coinName).then(response => {
              this.addressBook[bookPosition].worth = (response.data[0].price_usd * balance).toFixed(2);
                        this.total += parseInt(this.addressBook[bookPosition].worth);
            })
          });
      }
      if(coinName === 'Bitcoin'){
        BlockchainApis.btcApi(address)
          .then(response => {
            var balance = CryptoConverter.getBtcBalance(response.data.balance);
            CoinToUsd.getUsd(coinName).then(response => {
              this.addressBook[bookPosition].worth = (response.data[0].price_usd * balance).toFixed(2);
              this.total += parseInt(this.addressBook[bookPosition].worth);
            })
          });
      }

    },
    testerButton() {
      // console.log(this.addressBook[0].avatar);
      // console.log(this.addressBook[0].address);
      // var x=  this.$cookies.set('addressBook', JSON.stringify(this.addressBook))
      // this.$cookies.isKey(keyName)
      // console.log(x)
      // var x = this.$cookies.get('addressBook');
      // console.log(JSON.parse(x));
      this.total = 0;
      for (var i = 0, len = this.addressBook.length; i < len; i++) {
        if(!this.addressBook[i].divider){
          console.log(this.addressBook[i]);
          this.getValueOfAddress(this.addressBook[i].address,this.addressBook[i].subtitle,i);
          console.log(this.addressBook)
        }
      }
      //console.log(this.test2);
    }
  },
  created: function() {
    var final = '1vt8pHdYHpbZ7rgXFfiXm3uxaeVx1Yzjd'
    BlockchainApis.ethApi('0x1Ae4c1aC38BE9110bDb4cc19eC15Bbf7172F8157')
      .then(response => {
        var balance = CryptoConverter.getEthBalance(response.data.balance);
        CoinToUsd.getUsd('Ethereum').then(response => {
          return (response.data[0].price_usd * balance).toFixed(2);
        })
      });
    //Services.getAgencies('0x1Ae4c1aC38BE9110bDb4cc19eC15Bbf7172F8157')
    // axios.get(balanceService.ethApi('0x1Ae4c1aC38BE9110bDb4cc19eC15Bbf7172F8157'))
    //   .then(response => {
    //
    //
    //     console.log(weiToETH)
    //     this.test =  weiToETH
    //   })
    //   .catch(e => {
    //     console.log(e)
    //   })
  }

}
