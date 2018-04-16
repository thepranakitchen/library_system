
/* global Requests */

const libraryID = 161;
const req = new Requests(libraryID);

let bookTemplate = $('#templates .bookRow');
let bookTable = $('#bookTableBody');

async function getLibraryName() {
  let library = await req.getLibrary();
  $('.jumbotron h1').text(library.name);
}

getLibraryName();

function addBookToPage(book) {
  let newBook = bookTemplate.clone(true, true);
  newBook.attr('data-id', book.id);
  newBook.find('.bookImg').attr('src', book.image_url);
  newBook.find('.bookTitle').text(book.title);
  newBook.find('bookDesc').text(book.description);
  bookTable.append(newBook);
}

async function getBooks() {
  let books = await req.getBooks();
  books.forEach((book)=> {
    addBookToPage(book);
  });
}

async function testAPI() {
  console.log("Before Book Creation");

  let book1 = await req.createBook({
    title: "Principles",
    description: "Principles are ways of successfully dealing with reality to get what you want out of life",
    image_url: "https://images-na.ssl-images-amazon.com/images/I/71FDkx5WllL.jpg"
  });

  console.log("After Book Creation");
  console.log(book1);

  console.log("Now we'll request all the books from the library");

  let books = await req.getBooks();

  console.log("After the get all books request comes back");
  console.log(books);
}
