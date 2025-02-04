// Do your work here...
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("bookForm");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});

const books = [];
const EVENT_RENDER = "render-book";

function addBook() {
  const bookTitle = document.getElementById("bookFormTitle");
  const bookAuthor = document.getElementById("bookFormAuthor");
  const bookYear = document.getElementById("bookFormYear");
  const isComplete = document.getElementById("bookFormIsComplete");
  const bookFormSubmitButton = document.getElementById("bookFormSubmit");

  if (bookFormSubmitButton.dataset.editing === "true") {
    const editingBookId = parseInt(bookFormSubmitButton.dataset.bookId);
    const bookToEdit = findBook(editingBookId);

    if (bookToEdit) {
      bookToEdit.title = bookTitle.value;
      bookToEdit.author = bookAuthor.value;
      bookToEdit.year = parseInt(bookYear.value);
      bookToEdit.isComplete = isComplete.checked;

      saveData();
    }

    bookFormSubmitButton.dataset.editing = "false";
    bookFormSubmitButton.dataset.bookId = "";
    bookFormSubmitButton.innerText = "Masukkan Buku ke Rak";
  } else {
    const generateIDBook = generateID();
    const bookAsObject = generateBookObject(
      generateIDBook,
      bookTitle.value,
      bookAuthor.value,
      bookYear.value,
      isComplete.checked
    );
    books.push(bookAsObject);

    saveData();
  }

  document.dispatchEvent(new Event(EVENT_RENDER));
  resetBookForm();
}

function editBook(bookId) {
  const bookToEdit = findBook(bookId);
  if (!bookToEdit) return;

  const bookFormTitle = document.getElementById("bookFormTitle");
  const bookFormAuthor = document.getElementById("bookFormAuthor");
  const bookFormYear = document.getElementById("bookFormYear");
  const bookFormIsComplete = document.getElementById("bookFormIsComplete");
  const bookFormSubmitButton = document.getElementById("bookFormSubmit");

  bookFormTitle.value = bookToEdit.title;
  bookFormAuthor.value = bookToEdit.author;
  bookFormYear.value = bookToEdit.year;
  bookFormIsComplete.checked = bookToEdit.isComplete;

  bookFormSubmitButton.innerText = "Simpan Perubahan";
  bookFormSubmitButton.dataset.editing = "true";
  bookFormSubmitButton.dataset.bookId = bookId;
}

function resetBookForm() {
  const bookFormTitle = document.getElementById("bookFormTitle");
  const bookFormAuthor = document.getElementById("bookFormAuthor");
  const bookFormYear = document.getElementById("bookFormYear");
  const bookFormIsComplete = document.getElementById("bookFormIsComplete");
  const bookFormSubmitButton = document.getElementById("bookFormSubmit");

  bookFormTitle.value = "";
  bookFormAuthor.value = "";
  bookFormYear.value = "";
  bookFormIsComplete.checked = false;

  bookFormSubmitButton.innerText = "Masukkan Buku ke Rak";
  bookFormSubmitButton.dataset.editing = "false";
  bookFormSubmitButton.dataset.bookId = "";
}

function generateID() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year: Number(year),
    isComplete,
  };
}

document.addEventListener(EVENT_RENDER, function () {
  const incompleteBookList = document.getElementById("incompleteBookList");
  incompleteBookList.innerHTML = "";

  const completeBookList = document.getElementById("completeBookList");
  completeBookList.innerHTML = "";

  for (const book of books) {
    const bookElement = makeBook(book);
    if (book.isComplete) {
      completeBookList.append(bookElement);
    } else {
      incompleteBookList.append(bookElement);
    }
  }
});

function makeBook(bookAsObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookAsObject.title;
  bookTitle.setAttribute("data-testid", "bookItemTitle");

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = `Penulis: ${bookAsObject.author}`;
  bookAuthor.setAttribute("data-testid", "bookItemAuthor");

  const bookYear = document.createElement("p");
  bookYear.innerText = `Tahun: ${bookAsObject.year}`;
  bookYear.setAttribute("data-testid", "bookItemYear");

  // const textContainer = document.createElement("div");
  // textContainer.classList.add("inner");
  // textContainer.append(bookTitle, bookAuthor, bookYear);

  const container = document.createElement("div");
  // container.classList.add("item", "shadow");
  container.append(bookTitle, bookAuthor, bookYear);
  container.setAttribute("data-bookid", `${bookAsObject.id}`);
  container.setAttribute("data-testid", "bookItem");

  if (bookAsObject.isComplete) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    undoButton.innerText = "Belum selesai";
    undoButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    undoButton.addEventListener("click", function () {
      bookisNotRead(bookAsObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Hapus Buku";
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.addEventListener("click", function () {
      deletedBookFromList(bookAsObject.id); // Fungsi untuk menghapus buku dari daftar
    });
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerText = "Edit Buku";
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.addEventListener("click", function () {
      editBook(bookAsObject.id); // Fungsi untuk mengedit buku
    });

    container.append(undoButton, deleteButton, editButton);
  } else {
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerText = "Selesai dibaca";
    completeButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeButton.addEventListener("click", function () {
      bookisRead(bookAsObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Hapus Buku";
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.addEventListener("click", function () {
      deletedBookFromList(bookAsObject.id); // Fungsi untuk menghapus buku dari daftar
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerText = "Edit Buku";
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.addEventListener("click", function () {
      editBook(bookAsObject.id); // Fungsi untuk mengedit buku
    });

    container.append(completeButton, deleteButton, editButton);
  }

  return container;
}

function bookisRead(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(EVENT_RENDER));
  saveData();
}

function findBook(bookId) {
  return books.find((book) => book.id === bookId) || null;
}

function deletedBookFromList(bookId) {
  const bookTarget = findBookIndex(bookId);
  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(EVENT_RENDER));
  saveData();
}

function bookisNotRead(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(EVENT_RENDER));
  saveData();
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function saveData() {
  if (storageExist()) {
    const pass = JSON.stringify(books);
    localStorage.setItem(KEY_OF_STORAGE, pass);
    document.dispatchEvent(new Event(EVENT_SAVED));
  }
}

const EVENT_SAVED = "saved-book";
const KEY_OF_STORAGE = "book-list";

function storageExist() {
  if (typeof Storage === "undefined") {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(EVENT_SAVED, function () {
  console.log(localStorage.getItem(KEY_OF_STORAGE));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(KEY_OF_STORAGE);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(EVENT_RENDER));
}

document.addEventListener("DOMContentLoaded", function () {
  if (storageExist()) {
    loadDataFromStorage();
  }
});

/////////////////FIND BOOK CODE
function findBookByTitle(title) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
}
function renderFilteredBooks(filteredBooks) {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  for (const book of filteredBooks) {
    const bookElement = makeBook(book);
    if (book.isComplete) {
      completeBookList.append(bookElement);
    } else {
      incompleteBookList.append(bookElement);
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTitle = document.getElementById("searchBookTitle").value;
    const filteredBooks = findBookByTitle(searchTitle);
    renderFilteredBooks(filteredBooks);
  });
});

// console.log('Hello, world!');
