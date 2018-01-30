import axios from 'axios';
import BlockchainApis from './services/blockchainApis'
import CryptoConverter from './services/cryptoConverter'
import CoinToUsd from './services/balanceToUsd'
import Utilities from './services/utilities'

export default {
  data() {
    let icons = {
      'BTC': '../public/btc.png',
      'ETH': '../public/eth.png'
    }

    return {
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
      total: 0,
      snackbar: false,
      snackBarText: ''
    }
  },
  methods: {
    importAddressBook() {
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
        try {
          var parsedJson = JSON.parse(vm.importedJson)
          if (Utilities.checkIfAddressBook(parsedJson)){
            this.addressBook = parsedJson;
            this.snackBarText = "Address book succesfully imported!"
            this.snackbar = true
            this.getValueOfAddressBook();
          }
          else{
            console.log('Not an addressBook')
          }
        } catch (e) {
          console.log('Bad Json file bro')
        }

      }
      reader.readAsText(file);
    },
    saveCookie() {
      try{
        this.$cookies.set('addressBook', JSON.stringify(this.addressBook))
        this.snackBarText = "Address book succesfully saved to the browser!"
        this.snackbar = true
      }
      catch(e){

      }
    },
    exportAddressBook() {
      this.test = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.addressBook));
      this.$refs.downloadLink.setAttribute("href", "data:" + this.test)
      console.log(this.$refs.downloadLink)
      this.$refs.downloadLink.click();

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

      this.getValueOfAddressBook();
      this.snackBarText = coinInfo.name + " address succesfuly added!"
      this.snackbar = true
      this.addDialog = false
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
      this.total = 0;
      for (var i = 0, len = this.addressBook.length; i < len; i++) {
        if (!this.addressBook[i].divider) {
          console.log(this.addressBook[i]);
          this.getValueOfAddress(this.addressBook[i].address, this.addressBook[i].subtitle, i);
          console.log(this.addressBook)
        }
      }

    },
    getValueOfAddress(address, coinName, bookPosition) {
      if (coinName === 'Ethereum') {
        BlockchainApis.ethApi(address)
          .then(response => {
            var balance = CryptoConverter.getEthBalance(response.data.result);
            CoinToUsd.getUsd(coinName).then(response => {
              this.addressBook[bookPosition].worth = (response.data[0].price_usd * balance).toFixed(2);
              this.total += parseInt(this.addressBook[bookPosition].worth);
            })
          });
      }
      if (coinName === 'Bitcoin') {
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
      console.log(this.addressBook)
      // this.total = 0;
      // for (var i = 0, len = this.addressBook.length; i < len; i++) {
      //   if (!this.addressBook[i].divider) {
      //     console.log(this.addressBook[i]);
      //     this.getValueOfAddress(this.addressBook[i].address, this.addressBook[i].subtitle, i);
      //     console.log(this.addressBook)
      //   }
      // }
      //console.log(this.test2);
    }
  },
  created: function() {
    this.addressBook = JSON.parse(this.$cookies.get('addressBook'));
    if (this.addressBook) {
      this.getValueOfAddressBook();
    } else {
      this.addressBook = [];
    }
    // var final = '1vt8pHdYHpbZ7rgXFfiXm3uxaeVx1Yzjd'
    // BlockchainApis.ethApi('0x1Ae4c1aC38BE9110bDb4cc19eC15Bbf7172F8157')
    //   .then(response => {
    //     var balance = CryptoConverter.getEthBalance(response.data.balance);
    //     CoinToUsd.getUsd('Ethereum').then(response => {
    //       return (response.data[0].price_usd * balance).toFixed(2);
    //     })
    //   });
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
