class Requests {
  constructor(libraryID) {
    this.baseURL = "https://floating-woodland-64068.herokuapp.com/";
    this.libraryID = libraryID;
  }

  // ajax call function to be used for the class methods below
  ajaxCall(actionStr, urlStr, dataObj = {}) {
    return new Promise((resolve) => {
      let req = $.ajax({
        type: actionStr,
        url: this.baseURL + urlStr,
        data: dataObj
      });
      req.done((data) => {
        resolve(data);
      });
    });
  }

  createLibrary(name) {
    let promise = this.ajaxCall('POST', 'libraries', {
      library: {
        name: name
      }
    });
    return promise.then((data) => {
      this.libraryID = data.id;
    });
  }

  getLibrary() {
    return this.ajaxCall("GET", `libraries/${this.libraryID}`);
  }

  //BOOK METHODS
  createBook(book) {
    return this.ajaxCall("POST", `libraries/${this.libraryID}/books`, {book});
  }

  getBooks() {
    return this.ajaxCall("GET", `libraries/${this.libraryID}/books`);
  }

  updateBook(bookToUpdate) {
    return this.ajaxCall("PUT", `libraries/${this.libraryID}/books/${bookToUpdate.id}`, {
      book: bookToUpdate
    });
  }


  deleteBook(bookToDelete) {
    return this.ajaxCall("DELETE", `libraries/${this.libraryID}/books/${bookToDelete.id}`);
  }

  //BORROWER METHODS
  createBorrower(borrower) {
    return this.ajaxCall("POST", `libraries/${this.libraryID}/borrowers`, {borrower});
  }

  getBorrowers() {
    return this.ajaxCall("GET", `libraries/${this.libraryID}/borrowers`);
  }

  updateBorrower(borrower) {
    return this.ajaxCall("PUT", `libraries/${this.libraryID}/borrowers/${borrower.id}`, {borrower});
  }

  deleteBorrower(borrower) {
    return this.ajaxCall("DELETE", `libraries/${this.libraryID}/borrowers/${borrower.id}`);
  }


}
