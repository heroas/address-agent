export default {

  checkIfAddressBook(addressBook) {
    for (var i = 0, len = addressBook.length; i < len; i++) {
      if (!addressBook[i].divider) {

        if (addressBook[i].address && addressBook[i].avatar && addressBook[i].subtitle &&
          addressBook[i].title && addressBook[i].worth)
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
  }
}
