import axios from 'axios';
export default {
  data() {
    let icons = {
      1: '../public/btc.png',
      2: '../public/eth.png'
    }

    return {
      hidden: false,
      importedJson: 'x',
      addDialog: false,
      newCoin :null,
      newAddress: null,
      supportedCoins: [
          { name: 'BTC', group: 'Bitcoin', avatar: icons[1] },
          { name: 'ETH', group: 'Ethereum', avatar: icons[2] }
        ],
      addressBook:[]
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
    addAddress() {
      console.log(this.newCoin);
      console.log(this.newAddress);
      this.addressBook.push({"coin":this.newCoin,"address":this.newAddress});
    },
    testerButton(){
      console.log(this.addressBook[0].Coin);
    }
  },
  created: function() {

  }

}
