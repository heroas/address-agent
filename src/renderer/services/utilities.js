export default {

  checkIfAddressBook(addressBook) {
    for (var i = 0, len = addressBook.length; i < len; i++) {
      if (!addressBook[i].divider) {

        if (addressBook[i].address && addressBook[i].avatar && addressBook[i].symbol &&
          addressBook[i].name && addressBook[i].worth && addressBook[i].balance)
          return true;
        else
          return false;
      } else {
        if (addressBook[i].divider && addressBook[i].inset)
          return true;
        else
          return false;
      }
    }
  },
  buildErrorMessage(address, coinSymbol) {
    return 'Error retrieving balance from ' + coinSymbol + ' address: ' + address + '. Check if correct.';
  }
}
