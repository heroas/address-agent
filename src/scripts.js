import axios from 'axios';
export default {
  data() {
    let icons = {
      'BTC': '../public/btc.png',
      'ETH': '../public/eth.png'
    }

    return {
      hidden: false,
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
      addressBook: []
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
      console.log(coin);
      var coinInfo = this.searchForCoin(coin);
      console.log(coinInfo);

      this.addressBook.push({
        "avatar": coinInfo.avatar,
        "title": coinInfo.symbol,
        "subtitle": coinInfo.name,
        "address": address
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
    testerButton() {
      console.log(this.addressBook[0].avatar);
      console.log(this.addressBook[0].address);

    }
  },
  created: function() {

  }

}
