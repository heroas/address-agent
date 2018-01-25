import axios from 'axios';
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      hidden: true,
      importedJson: 'x'
    }
  },
  methods: {
    importJson() {
      this.hidden = !this.hidden;
      this.$refs.inputBtn.click();
      console.log(this.$refs);
    },
    save(formData) {
      // upload data to the server
      console.log(formData);
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
    showJson(){
      var hi = JSON.parse(this.importedJson);
      console.log(hi);
    }
  },
  created: function() {

  }

}
